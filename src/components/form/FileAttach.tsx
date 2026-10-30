'use client';

import React, { useId, useRef, useState } from 'react';
import { AlertCircle, ArrowRight, FileImage, RefreshCw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface FileAttachProps {
  /** Explicit HTML ID for the file input */
  id?: string;
  /** Primary label displayed on the left. Default: 'Upload a Photo of Yourself' */
  label?: string;
  /** Button text for empty state. Default: 'Attach File' */
  buttonText?: string;
  /** Accepted MIME types or extensions. Default: image/jpeg,image/png,image/webp,image/avif */
  accept?: string;
  /** Maximum allowed file size in bytes. Default: 5MB (5 * 1024 * 1024) */
  maxSizeBytes?: number;
  /** Human-readable max size text for helper/error messages. Default: '5MB' */
  maxSizeLabel?: string;
  /** External validation error message */
  error?: string;
  /** Whether the control is disabled */
  disabled?: boolean;
  /** Callback fired when a file is selected, replaced, or removed */
  onFileSelect?: (file: File | null) => void;
  /** Optional custom class name */
  className?: string;
}

/** Format file size in human-readable units */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Accessible client-side file attachment component grounded in Figma frame:
 * `design-reference/How it works Page/4-Assistance request.png`
 *
 * Scope: Client-side validation and file selection only.
 * Cloudinary uploads and `/api/uploads/sign` belong to Phase 9.2.
 */
export function FileAttach({
  id: explicitId,
  label = 'Upload a Photo of Yourself',
  buttonText = 'Attach File',
  accept = 'image/jpeg,image/png,image/webp,image/avif',
  maxSizeBytes = 5 * 1024 * 1024,
  maxSizeLabel = '5MB',
  error: externalError,
  disabled = false,
  onFileSelect,
  className,
}: FileAttachProps) {
  const generatedId = useId();
  const inputId = explicitId || generatedId;
  const errorId = `${inputId}-error`;
  const statusId = `${inputId}-status`;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [internalError, setInternalError] = useState<string | null>(null);

  const activeError = externalError || internalError;

  const validateAndSetFile = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setInternalError(null);
      onFileSelect?.(null);
      return;
    }

    // 1. Validate file size
    if (file.size > maxSizeBytes) {
      const errorMsg = `File size (${formatFileSize(file.size)}) exceeds the ${maxSizeLabel} limit.`;
      setInternalError(errorMsg);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onFileSelect?.(null);
      return;
    }

    // 2. Validate file MIME type or extension
    const acceptedTypes = accept
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    if (acceptedTypes.length > 0) {
      const fileType = file.type.toLowerCase();
      const fileName = file.name.toLowerCase();
      const matchesMime = acceptedTypes.some((t) => !t.startsWith('.') && fileType === t);
      const matchesWildcard = acceptedTypes.some(
        (t) => t.endsWith('/*') && fileType.startsWith(t.slice(0, -1)),
      );
      const matchesExt = acceptedTypes.some((t) => t.startsWith('.') && fileName.endsWith(t));

      if (!matchesMime && !matchesWildcard && !matchesExt && fileType !== '') {
        const errorMsg = 'Please select a valid image file (JPEG, PNG, or WebP).';
        setInternalError(errorMsg);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        onFileSelect?.(null);
        return;
      }
    }

    // File passed client validation
    setInternalError(null);
    setSelectedFile(file);
    onFileSelect?.(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    validateAndSetFile(file);
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    validateAndSetFile(null);
  };

  const handleTriggerPicker = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTriggerPicker();
    }
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* Visual Upload Area */}
      <div
        className={cn(
          'bg-lavender rounded-2xl p-5 transition-all sm:p-6',
          activeError ? 'ring-danger ring-2' : 'ring-border/50 ring-1',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        {/* Hidden native accessible file input */}
        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept={accept}
          disabled={disabled}
          aria-invalid={activeError ? 'true' : undefined}
          aria-describedby={cn(activeError && errorId, statusId)}
          className="sr-only"
          onChange={handleInputChange}
        />

        {!selectedFile ? (
          /* Empty State: Prompt + Attach File CTA (Matches Design Frame) */
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-navy text-base font-medium select-none sm:text-lg">{label}</span>

            <button
              type="button"
              disabled={disabled}
              onClick={handleTriggerPicker}
              onKeyDown={handleKeyDown}
              className={cn(
                'border-navy/40 text-navy inline-flex items-center justify-center gap-2 rounded-full border bg-white/70 px-6 py-2.5 text-sm font-semibold shadow-xs transition-colors',
                'hover:border-navy hover:bg-white hover:shadow-sm',
                'focus-visible:outline-navy focus-visible:outline-2 focus-visible:outline-offset-2',
                disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              <span>{buttonText}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          /* Selected State: File Name, Size, Replace, and Remove */
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="text-navy flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-xs">
                <FileImage className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-navy truncate text-sm font-semibold sm:text-base">
                  {selectedFile.name}
                </p>
                <p id={statusId} className="text-xs text-slate-600">
                  {formatFileSize(selectedFile.size)} • Photo selected locally
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {/* Replace Button */}
              <button
                type="button"
                disabled={disabled}
                onClick={handleTriggerPicker}
                className={cn(
                  'border-navy/30 text-navy inline-flex items-center gap-1.5 rounded-full border bg-white/80 px-4 py-2 text-xs font-semibold transition-colors',
                  'hover:border-navy focus-visible:outline-navy hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2',
                  disabled && 'cursor-not-allowed opacity-50',
                )}
                aria-label="Replace photo"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Replace</span>
              </button>

              {/* Remove Button */}
              <button
                type="button"
                disabled={disabled}
                onClick={handleRemove}
                className={cn(
                  'border-danger/30 text-danger inline-flex items-center gap-1.5 rounded-full border bg-white/80 px-4 py-2 text-xs font-semibold transition-colors',
                  'hover:border-danger hover:bg-danger/10 focus-visible:outline-danger focus-visible:outline-2 focus-visible:outline-offset-2',
                  disabled && 'cursor-not-allowed opacity-50',
                )}
                aria-label="Remove photo"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inline Validation Error */}
      {activeError && (
        <div
          id={errorId}
          role="alert"
          aria-live="assertive"
          className="text-danger flex items-center gap-1.5 px-1 text-xs font-medium"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{activeError}</span>
        </div>
      )}
    </div>
  );
}
