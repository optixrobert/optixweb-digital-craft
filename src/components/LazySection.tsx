import { useRef, ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  threshold?: number;
}

const LazySection = ({ 
  children, 
  fallback = <div className="h-20 bg-gray-50 animate-pulse" />, 
  className = "",
  threshold = 0.1 
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold });

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
};

export default LazySection;