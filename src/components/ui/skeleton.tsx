import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export default function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse flex items-center justify-center rounded-lg bg-gray-400', className)} style={{ width, height, padding: '14px 16px', borderRadius: '16px' }}>
      <div className="w-6 h-4 rounded-md" />
    </div>
  );
}
