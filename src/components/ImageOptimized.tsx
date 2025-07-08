import { useState, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  priority = false, 
  sizes = "100vw",
  ...props 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}
      
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          loading={priority ? "eager" : "lazy"}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-100 text-gray-400 min-h-[200px]">
          <span>Immagine non disponibile</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;