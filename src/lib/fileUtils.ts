// File utilities for handling attachments and file previews

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  extension: string;
  isImage: boolean;
  isSupported: boolean;
}

// Supported image formats
const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp'
];

// Get file extension from filename
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

// Check if file type is a supported image
export function isSupportedImageType(fileType: string): boolean {
  return SUPPORTED_IMAGE_TYPES.includes(fileType.toLowerCase());
}

// Format file size to human readable format
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const dm = 2;
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + units[i];
}

// Get file info from File object
export function getFileInfo(file: File): FileInfo {
  const extension = getFileExtension(file.name);
  const isImage = isSupportedImageType(file.type);
  
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    extension,
    isImage,
    isSupported: isImage || file.type === 'application/pdf' || file.type.startsWith('text/')
  };
}

// Get file icon based on type
export function getFileIcon(fileType: string, extension: string): string {
  if (isSupportedImageType(fileType)) {
    return '🖼️';
  }
  
  switch (extension.toLowerCase()) {
    case 'pdf':
      return '📄';
    case 'doc':
    case 'docx':
      return '📝';
    case 'xls':
    case 'xlsx':
      return '📊';
    case 'ppt':
    case 'pptx':
      return '📋';
    case 'txt':
      return '📋';
    case 'zip':
    case 'rar':
    case '7z':
      return '🗜️';
    default:
      return '📎';
  }
}

// Truncate filename for display
export function truncateFilename(filename: string, maxLength: number = 20): string {
  if (filename.length <= maxLength) {
    return filename;
  }
  
  const extension = getFileExtension(filename);
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
  const availableLength = maxLength - extension.length - 4; // 4 for "..." and "."
  
  if (availableLength > 0) {
    return `${nameWithoutExt.substring(0, availableLength)}...${extension}`;
  }
  
  return `${filename.substring(0, maxLength - 3)}...`;
}

// Validate file for upload
export function validateFile(file: File, maxSizeInMB: number = 10): { isValid: boolean; error?: string } {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  
  if (file.size > maxSizeInBytes) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeInMB}MB`
    };
  }
  
  // Add more validation rules as needed
  const allowedTypes = [
    ...SUPPORTED_IMAGE_TYPES,
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'File type not supported. Please use images, PDF, or document files.'
    };
  }
  
  return { isValid: true };
}
