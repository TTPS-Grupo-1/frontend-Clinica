interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: boolean;
}

export default function Skeleton({
  className = '',
  height = 'h-4',
  width = 'w-full',
  rounded = true,
}: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${height} ${width} ${rounded ? 'rounded' : ''} ${className}`}
    />
  );
}
