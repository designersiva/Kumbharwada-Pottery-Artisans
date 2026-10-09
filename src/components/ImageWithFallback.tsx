import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  categoryHint?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  aspectRatioClass = 'aspect-[4/3]',
  categoryHint = 'Terracotta',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className={`w-full ${aspectRatioClass} bg-[#F4EBD9] border border-[#E5D3B5] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden`}
        aria-label={alt}
      >
        {/* Subtle decorative background pottery concentric ring motif */}
        <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border-2 border-[#A85D36]" />
          <div className="w-32 h-32 rounded-full border border-[#A85D36] absolute" />
          <div className="w-16 h-16 rounded-full border border-[#A85D36] absolute" />
        </div>

        {/* Pottery Icon SVG */}
        <div className="w-12 h-12 mb-2 rounded-full bg-[#E5D3B5] flex items-center justify-center text-[#A85D36] shadow-sm">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.7 2.8 1.8 3.7C6.6 12 5 14.5 5 18c0 2.2 3.1 4 7 4s7-1.8 7-4c0-3.5-1.6-6-2.8-7.3C17.3 9.8 18 8.5 18 7c0-2.5-2.5-5-6-5zm0 2c2.4 0 4 1.5 4 3 0 .8-.5 1.7-1.3 2.3-.5.4-.8.9-.7 1.5.1.7.6 1.3 1.2 1.8C16.3 13.6 17 15.6 17 18c0 1.2-2.2 2-5 2s-5-.8-5-2c0-2.4.7-4.4 1.8-5.4.6-.5 1.1-1.1 1.2-1.8.1-.6-.2-1.1-.7-1.5C8.5 8.7 8 7.8 8 7c0-1.5 1.6-3 4-3z" />
          </svg>
        </div>
        <span className="text-xs font-semibold tracking-wide uppercase text-[#8C4722]">
          {categoryHint}
        </span>
        <span className="text-xs text-[#6B5A51] max-w-[200px] line-clamp-1 mt-0.5">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} bg-[#F4EBD9]`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-80'}`}
      />
    </div>
  );
};
