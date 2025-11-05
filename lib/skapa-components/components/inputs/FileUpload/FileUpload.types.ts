import React from 'react';

export type FileUploadSize = 'small' | 'medium' | 'large';

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Size of the file upload
   * @default 'medium'
   */
  size?: FileUploadSize;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text displayed below the file upload
   */
  helperText?: string;

  /**
   * Error message (shows error state)
   */
  error?: string;

  /**
   * Full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Show file preview
   * @default true
   */
  showPreview?: boolean;

  /**
   * Callback when files are selected
   */
  onFilesChange?: (files: FileList | null) => void;
}
