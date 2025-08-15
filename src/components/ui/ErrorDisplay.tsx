"use client";

interface ErrorDisplayProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export default function ErrorDisplay({ 
  title = 'Something went wrong', 
  message, 
  onRetry,
  showRetry = true 
}: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
      <div className="text-red-400 mb-4">
        <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 text-sm leading-relaxed">{message}</p>
      
      {showRetry && onRetry && (
        <button 
          onClick={onRetry}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-smooth btn-hover focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
