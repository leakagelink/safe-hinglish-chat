
import React from 'react';

const AppLogo = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center`}>
      <img 
        src="/lovable-uploads/65f0b163-d85f-424b-bcce-2fdd9c61c5e0.png" 
        alt="SafeChat Assistant Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default AppLogo;
