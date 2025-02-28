import { Suspense } from 'react';
import VideoGallery from './video-gallery';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Video Gallery</h1>
      <Suspense fallback={<div className="text-center">Loading gallery...</div>}>
        <VideoGallery />
      }
      </Suspense>
    </main>
  );
}