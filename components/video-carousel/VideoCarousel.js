'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

export function VideoCarousel({ videos = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
    setPlaying(false);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setPlaying(true);
  };

  useEffect(() => {
    setPlaying(false);
  }, [currentIndex]);

  return (
    <div className="relative bg-card rounded-lg p-4 shadow-md">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
        {playing ? (
          <video
            src={videos[currentIndex].video_url}
            className="w-full h-full object-contain"
            controls
            autoPlay
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center cursor-pointer flex items-center justify-center group"
            style={{
              backgroundImage: `url(${videos[currentIndex].thumbnail_url})`,
            }}
            onClick={() => setPlaying(true)}
          >
            <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
              <Play className="h-8 w-8 text-white fill-current ml-1" />
            </div>
          </div>
        )}

        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          onClick={prevSlide}
          aria-label="Previous video"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          onClick={nextSlide}
          aria-label="Next video"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <h2 className="text-lg font-medium mb-3">{videos[currentIndex].title}</h2>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`flex-shrink-0 cursor-pointer relative transition-all duration-200 transform hover:scale-105 ${
              index === currentIndex ? 'ring-2 ring-primary scale-105' : ''
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-24 h-16 object-cover rounded"
            />
            {index === currentIndex && (
              <div className="absolute inset-0 bg-primary/10 rounded"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}