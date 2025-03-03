'use client';

import { useState, useEffect } from 'react';
import VideoUploader from '@/components/VideoUploader';
import VideoCarousel from '@/components/VideoCarousel';
import { FileVideo } from 'lucide-react';

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/gallery');
        const result = await res.json();
        setVideos(result);
      } catch (error) {
        console.error('Network error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUploadComplete = (newVideos) => {
    setVideos(prevVideos => [...newVideos, ...prevVideos]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <VideoUploader onUploadComplete={handleUploadComplete} />

      {loading ? (
        <div className="text-center p-8 bg-muted rounded-lg">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-lg bg-muted-foreground/20 h-48 w-full mb-4"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
          </div>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center p-8 bg-muted rounded-lg">
          <FileVideo className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No videos available</h3>
          <p className="text-muted-foreground">Upload your first video to get started!</p>
        </div>
      ) : (
        <VideoCarousel videos={videos} />
      )}
    </div>
  );
}
