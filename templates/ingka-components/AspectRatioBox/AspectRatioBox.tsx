import React from 'react';

export interface AspectRatioBoxProps {
  /** Aspect ratio (e.g., "16:9", "4:3", "1:1") */
  ratio?: '16:9' | '4:3' | '3:2' | '1:1' | '9:16';
  /** Children content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const AspectRatioBox: React.FC<AspectRatioBoxProps> = ({
  ratio = '16:9',
  children,
  className = '',
}) => {
  const ratioMap = {
    '16:9': 'pb-[56.25%]',
    '4:3': 'pb-[75%]',
    '3:2': 'pb-[66.67%]',
    '1:1': 'pb-[100%]',
    '9:16': 'pb-[177.78%]',
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className={`${ratioMap[ratio]}`} />
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
};
