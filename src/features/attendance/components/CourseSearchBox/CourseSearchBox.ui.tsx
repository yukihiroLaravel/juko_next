'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/atoms/Input';

type CourseSearchBoxUIProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function CourseSearchBoxUI({
  value,
  onChange,
  placeholder = '講座検索',
}: CourseSearchBoxUIProps) {
  return (
    <div className="relative w-64">
      {/* 虫眼鏡アイコン */}
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      {/* 検索 input */}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9"
      />
    </div>
  );
}
