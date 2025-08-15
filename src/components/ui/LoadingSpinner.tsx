"use client";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  subText?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  subText 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]} mb-4`}></div>
      {text && (
        <p className="text-gray-600 font-medium mb-2">{text}</p>
      )}
      {subText && (
        <p className="text-gray-400 text-sm text-center max-w-xs">{subText}</p>
      )}
    </div>
  );
}
