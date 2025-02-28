import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files');
    console.log(files)

    if (!files.length) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    let uploadedVideos = [];

    for (const file of files) {
      try {
        const cloudinaryForm = new FormData();
        cloudinaryForm.append('file', file);
        cloudinaryForm.append('upload_preset', 'tolstoy');
        cloudinaryForm.append('folder', 'video-gallery');

        const uploadResponse = await fetch(
          'https://api.cloudinary.com/v1_1/drkkialon/auto/upload',
          { method: 'POST', body: cloudinaryForm }
        );

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error?.message || 'Upload failed');
        }

        const cloudinaryData = await uploadResponse.json();
        const thumbnail_url = `${cloudinaryData.secure_url.replace(/\.\w+$/, '.jpg')}`;

        uploadedVideos.push({
          id: Date.now().toString() + Math.random(),
          cloudinary_id: cloudinaryData.public_id,
          title: file.name,
          video_url: cloudinaryData.secure_url,
          thumbnail_url,
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    if (uploadedVideos.length > 0) {
      const { data, error } = await supabase.from('videos').insert(uploadedVideos).select('*');

      if (error) {
        throw error;
      }

      return NextResponse.json({ success: true, videos: data }, { status: 200 });
    }

    return NextResponse.json({ error: 'No files were successfully uploaded' }, { status: 500 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
