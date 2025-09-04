import { useState } from 'react';

interface AudioWithFallbackProps {
  /**
   * Ordered list of audio sources. The component will try each source in
   * sequence until one succeeds. If all fail, it displays an error message.
   */
  sources: string[];
}

export default function AudioWithFallback({ sources }: AudioWithFallbackProps) {
  // Index of the currently playing source
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    // Try the next source if available
    if (currentIndex < sources.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // No more sources to try
      setHasError(true);
    }
  };

  // Determine the current source; undefined if index out of bounds
  const currentSource = sources[currentIndex];

  if (hasError || !currentSource) {
    return <p className="text-red-500">Audio unavailable</p>;
  }

  return (
    <audio
      controls
      preload="metadata"
      className="w-full"
      onError={handleError}
    >
      <source src={currentSource} />
      Your browser does not support the audio element.
    </audio>
  );
}
