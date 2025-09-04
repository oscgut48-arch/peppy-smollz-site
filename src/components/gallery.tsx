"use client";

import { useState, useEffect } from 'react';

export interface GalleryProps {
  /**
   * Array of image paths. These should be relative URLs starting with
   * '/images/' as defined in content.json. The gallery displays each image
   * in a responsive grid. Clicking an image opens it in a full-screen
   * modal overlay.
   */
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const open = (idx: number) => {
    setCurrentIndex(idx);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    setCurrentIndex(null);
    document.body.style.overflow = '';
  };

  // Close the modal when the escape key is pressed
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt="Gallery image"
            className="w-full h-40 object-cover rounded cursor-pointer"
            onClick={() => open(idx)}
          />
        ))}
      </div>
      {currentIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <img
            src={images[currentIndex]}
            alt="Enlarged view"
            className="max-h-full max-w-full rounded"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
