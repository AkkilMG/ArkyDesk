"use client";

interface ShimmerProps {
  className?: string;
  shape?: 'rect' | 'circle';
  variant?: 'default' | 'list' | 'card' | 'avatar' | 'banner' | 'button';
}

export default function Shimmer({ className = '', shape = 'rect', variant = 'default' }: ShimmerProps) {
  const variants: Record<string, string> = {
    default: 'bg-gray-200/70 dark:bg-gray-700/60 animate-pulse',
    list: 'bg-gray-200/60 dark:bg-gray-700/50 animate-pulse',
    card: 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-[pulse_1.6s_infinite]',
    avatar: 'bg-gray-200/80 dark:bg-gray-700/70 animate-pulse',
    banner: 'bg-gradient-to-r from-purple-100 via-purple-50 to-blue-100 animate-[pulse_2s_infinite]',
    button: 'bg-white/40 animate-pulse'
  };

  const base = variants[variant] || variants.default;
  const shapeClass = shape === 'circle' || variant === 'avatar' ? 'rounded-full' : 'rounded';
  return <div className={`${base} ${shapeClass} ${className}`} />;
}
