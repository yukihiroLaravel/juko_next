'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Upload } from 'lucide-react';

type Props = {
  value?: File;
  onChange: (file: File | undefined) => void;
  defaultImageUrl?: string;
};

export function ImageUploader({
  value,
  onChange,
  defaultImageUrl,
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

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
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

      <div className="border-input flex h-40 items-center justify-center rounded-md border">
        {displayUrl ? (
          <img
            src={displayUrl}
            alt="講座画像プレビュー"
            className="h-full w-full rounded-md object-contain"
          />
        ) : (
          <span className="text-sm">講座画像</span>
        )}
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed py-6 text-center ${
          isDragging ? 'border-primary bg-primary/10' : 'border-input'
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