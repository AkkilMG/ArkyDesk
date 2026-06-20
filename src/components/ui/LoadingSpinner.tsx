"use client";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  subText?: string;
}

import Shimmer from './Shimmer';

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  subText 
}: LoadingSpinnerProps) {
  const sizeClasses: any = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Shimmer className={`${sizeClasses[size]} mb-4`} shape="circle" />
      {text && (
        <p className="text-gray-600 font-medium mb-2">{text}</p>
      )}
      {subText && (
        <p className="text-gray-400 text-sm text-center max-w-xs">{subText}</p>
      )}
    </div>
  );
}
