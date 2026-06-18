'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Upload } from 'lucide-react';

type Props = {
  value?: File;
  onChange: (file: File | undefined) => void;
  defaultImageUrl?: string;
};

export function ImageUploader({ value, onChange, defaultImageUrl }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // value(File) からプレビュー用のURLを派生する（render 中に派生し setState はしない）
  const previewUrl = useMemo(
    () => (value ? URL.createObjectURL(value) : null),
    [value],
  );

  // 生成したURLは value 変更時・アンマウント時に解放する。
  // previewUrl が変わると直前の effect の cleanup が走り、前の URL が revoke される。
  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  // ファイル未選択時はAPIから取得した既存画像URLを表示
  const displayUrl = previewUrl ?? defaultImageUrl ?? null;

  // ファイル選択時、画像ファイルでない場合はエラーを表示
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

  // ドラッグ＆ドロップ領域
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  // ドラッグオーバー時
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // ドラッグリーブ時
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {/* クリックして選択 */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-3 py-1.5 text-sm"
      >
        クリックしてファイルを選択
      </button>

      {/* プレビュー枠 */}
      <div className="border-input flex h-28 items-center justify-center rounded-md border shadow-xs">
        {displayUrl ? (
          <img
            src={displayUrl}
            alt="プロフィール画像プレビュー"
            className="h-full w-full rounded-md object-contain"
          />
        ) : (
          <span>プロフィール画像</span>
        )}
      </div>

      {/* ドラッグ＆ドロップ領域 */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
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

      {/* 画像以外を選択・ドロップしたときのフィードバック */}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
