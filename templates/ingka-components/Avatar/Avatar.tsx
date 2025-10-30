import React from 'react';

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  fallback?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'medium', fallback }) => {
  const sizes = { small: 'w-8 h-8', medium: 'w-12 h-12', large: 'w-16 h-16' };
  
  return (
    <div className={`${sizes[size]} rounded-full bg-gray-200 flex items-center justify-center overflow-hidden`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-gray-600 font-medium">{fallback || alt[0]?.toUpperCase()}</span>
      )}
    </div>
  );
};
