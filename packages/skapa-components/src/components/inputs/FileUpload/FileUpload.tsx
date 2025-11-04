import React, { useState, useRef } from "react";
import clsx from "clsx";
import type { FileUploadProps } from "./FileUpload.types";
import styles from "./FileUpload.module.css";

/**
 * FileUpload component for file selection with drag & drop
 *
 * @example
 * // Basic file upload
 * <FileUpload />
 *
 * @example
 * // With label
 * <FileUpload label="Upload Documents" />
 *
 * @example
 * // With callback
 * <FileUpload
 *   label="Upload Images"
 *   accept="image/*"
 *   onFilesChange={(files) => console.log('Files:', files)}
 * />
 *
 * @example
 * // Multiple files
 * <FileUpload
 *   label="Upload Files"
 *   multiple
 *   showPreview
 * />
 */
export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      size = "medium",
      label,
      helperText,
      error,
      showPreview = true,
      required,
      disabled,
      fullWidth = false,
      multiple,
      accept,
      onFilesChange,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      setFiles(selectedFiles);
      onFilesChange?.(selectedFiles);
      onChange?.(e);
    };

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled) return;

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const droppedFiles = e.dataTransfer.files;
        setFiles(droppedFiles);
        onFilesChange?.(droppedFiles);

        // Update the input element
        if (inputRef.current) {
          inputRef.current.files = droppedFiles;
        }
      }
    };

    const handleClick = () => {
      inputRef.current?.click();
    };

    const removeFile = (index: number) => {
      if (!files) return;

      const dt = new DataTransfer();
      for (let i = 0; i < files.length; i++) {
        if (i !== index) {
          dt.items.add(files[i]);
        }
      }

      const newFiles = dt.files;
      setFiles(newFiles);
      onFilesChange?.(newFiles);

      if (inputRef.current) {
        inputRef.current.files = newFiles;
      }
    };

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    };

    const labelClasses = clsx(styles.label, styles[size]);

    const uploadAreaClasses = clsx(styles.uploadArea, styles[size], {
      [styles.dragActive]: dragActive,
      [styles.disabled]: disabled,
      [styles.error]: Boolean(error),
    });

    const textClasses = clsx(styles.text, styles[size]);

    const helperTextClasses = clsx(styles.helperText, {
      [styles.error]: Boolean(error),
    });

    return (
      <div
        className={clsx(
          styles.container,
          { [styles.fullWidth]: fullWidth },
          className
        )}
      >
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div
          className={uploadAreaClasses}
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={(node) => {
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              (
                inputRef as React.MutableRefObject<HTMLInputElement | null>
              ).current = node;
            }}
            type="file"
            className={styles.input}
            disabled={disabled}
            required={required}
            multiple={multiple}
            accept={accept}
            onChange={handleFileChange}
            {...props}
          />

          <svg
            className={styles.icon}
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V16M12 4L8 8M12 4L16 8M4 17V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className={textClasses}>
            <strong>Click to upload</strong> or drag and drop
          </div>

          {accept && (
            <div className={styles.subtext}>{accept.split(",").join(", ")}</div>
          )}
        </div>

        {showPreview && files && files.length > 0 && (
          <div className={styles.preview}>
            {Array.from(files).map((file, index) => (
              <div key={index} className={styles.fileItem}>
                <span className={styles.fileName}>{file.name}</span>
                <span className={styles.fileSize}>
                  {formatFileSize(file.size)}
                </span>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  aria-label="Remove file"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {(error || helperText) && (
          <span className={helperTextClasses}>{error || helperText}</span>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
