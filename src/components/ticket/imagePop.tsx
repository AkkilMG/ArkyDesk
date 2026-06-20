// components/ImagePopup.tsx
import React, { useState, useEffect } from 'react';
import Shimmer from '@/components/ui/Shimmer';

interface ImagePopupProps {
  imageUrl: string;
  onClose: () => void;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ imageUrl, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Handle escape key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === ' ' || e.key === 'Enter') {
        setIsZoomed(!isZoomed);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose, isZoomed]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-xl shadow-2xl p-4 max-w-4xl max-h-[90vh] w-full">
        {/* Header with close button */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate pr-4">
            Image Preview
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => setIsZoomed(!isZoomed)}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-smooth"
              title={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              {isZoomed ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10h-6" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              )}
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-smooth text-xl"
              title="Close (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Image container */}
        <div className="overflow-auto max-h-[calc(90vh-120px)] flex items-center justify-center bg-gray-50 rounded-lg">
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-8">
              <Shimmer className="h-8 w-8" shape="circle" />
              <p className="mt-2 text-sm text-gray-600">Loading image...</p>
            </div>
          )}
          
          {imageError ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <p className="text-gray-600 text-sm mb-2">Failed to load image</p>
              <p className="text-gray-400 text-xs">The image may be corrupted or the link is invalid</p>
            </div>
          ) : (
            <img 
              src={imageUrl} 
              alt="Preview" 
              className={`rounded-lg mx-auto transition-all duration-300 ${
                isZoomed 
                  ? 'max-w-none cursor-zoom-out scale-150 hover:scale-200' 
                  : 'max-w-full max-h-full cursor-zoom-in hover:scale-105'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              onClick={(e) => setIsZoomed(!isZoomed)}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          )}
        </div>

        {/* Footer with instructions */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Click image to {isZoomed ? 'zoom out' : 'zoom in'} • Press Esc to close • Space to toggle zoom
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
