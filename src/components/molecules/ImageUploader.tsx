'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Upload } from 'lucide-react';

type Props = {
  value?: File;
  onChange: (file: File | undefined) => void;
  defaultImageUrl?: string;
  alt: string;
  emptyMessage: string;
  previewClassName?: string;
};

export function ImageUploader({
  value,
  onChange,
  defaultImageUrl,
  alt,
  emptyMessage,
  previewClassName = 'h-28',
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = useMemo(
    () => (value ? URL.createObjectURL(value) : null),
    [value],
  );

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const displayUrl = previewUrl ?? defaultImageUrl ?? null;

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('画像ファイルを選択してください');
      return;
    }

    setError(null);
    onChange(file);
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = '';
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-3 py-1.5 text-sm"
      >
        クリックしてファイルを選択
      </button>

      <div
        className={`border-input flex ${previewClassName} items-center justify-center rounded-md border`}
      >
        {displayUrl ? (
          <img
            src={displayUrl}
            alt={alt}
            className="h-full w-full rounded-md object-contain"
          />
        ) : (
          <span>{emptyMessage}</span>
        )}
      </div>

      <div
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed py-6 text-center transition-colors ${
          isDragging ? 'border-primary bg-primary/10' : 'border-input bg-white'
        }`}
      >
        <Upload className="h-5 w-5" />
        <p className="text-xs">
          または
          <br />
          ファイルをここにドラッグアンドドロップ
        </p>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
