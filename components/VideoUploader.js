'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2 } from 'lucide-react';

export default function VideoUploader({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  const processUpload = async (files) => {
    if (!files.length) return;

    setUploading(true);
    setProgress(0);
    setUploadError(null);

    const totalFiles = files.length;
    let uploadedCount = 0;
    const allVideos = [];

    try {
      const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('files', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Upload failed');
        }

        uploadedCount++;
        const newProgress = Math.floor((uploadedCount / totalFiles) * 100);
        setProgress(newProgress);

        allVideos.push(...result.videos);

        if (uploadedCount === totalFiles) {
          if (onUploadComplete) {
            onUploadComplete(allVideos);
          }
        }
      };

      for (const file of files) {
        await uploadFile(file);
      }

    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error.message);
    } finally {
      setProgress(100);
      setTimeout(() => setUploading(false), 1000);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    processUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': [] },
    disabled: uploading,
    multiple: true,
  });

  return (
    <div className="mb-8">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 transition-colors text-center cursor-pointer
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'}
          ${uploading ? 'opacity-80 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center space-y-4">
          {uploading ? (
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          ) : (
            <div className="bg-primary/10 p-3 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
          )}

          <div className="space-y-1 text-center">
            <p className="text-lg font-medium">
              {isDragActive
                ? 'Drop videos here...'
                : uploading
                  ? 'Uploading...'
                  : 'Drag & drop videos here or click to browse'}
            </p>
            <p className="text-sm text-muted-foreground">
              Support for MP4, WebM, and other video formats
            </p>
          </div>

          {uploading && (
            <div className="w-full max-w-xs">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1 text-center">Uploading: {progress}%</p>
            </div>
          )}

          {uploadError && <p className="text-sm text-destructive">{uploadError}</p>}
        </div>
      </div>
    </div>
  );
}
