'use client';

import { useState } from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  useWatch,
} from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { Calendar } from '@/components/atoms/Calendar';
import { Label } from '@/components/atoms/Label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/atoms/Popover';
import { RadioGroup, RadioGroupItem } from '@/components/atoms/RadioGroup';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/Select';
import { formatInputDate, parseInputDate } from '@/utils/date';

export type DeadlineType = 'none' | 'fixed_date' | 'relative_days';

type Props<T extends FieldValues> = {
  control: Control<T>;
  deadlineTypeName: Path<T>;
  fixedDateName: Path<T>;
  relativeDaysName: Path<T>;
  onDeadlineTypeChange: (value: DeadlineType) => void;
  onFixedDateChange: (value: string) => void;
  onRelativeDaysChange: (value: number) => void;
  fixedDateError?: string;
  relativeDaysError?: string;
  idPrefix?: string;
};

const errorClass = 'text-sm text-red-600';

export function DeadlineFields<T extends FieldValues>({
  control,
  deadlineTypeName,
  fixedDateName,
  relativeDaysName,
  onDeadlineTypeChange,
  onFixedDateChange,
  onRelativeDaysChange,
  fixedDateError,
  relativeDaysError,
  idPrefix = 'deadline',
}: Props<T>) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const watchedDeadlineType = useWatch({ control, name: deadlineTypeName });
  const watchedDeadlineTypeValue = String(watchedDeadlineType);
  let deadlineType: DeadlineType = 'none';
  if (watchedDeadlineTypeValue === 'fixed_date') deadlineType = 'fixed_date';
  if (watchedDeadlineTypeValue === 'relative_days') {
    deadlineType = 'relative_days';
  }
  const watchedFixedDate = useWatch({ control, name: fixedDateName });
  const fixedDate = watchedFixedDate == null ? '' : String(watchedFixedDate);
  const watchedRelativeDays = useWatch({ control, name: relativeDaysName });
  const relativeDays =
    watchedRelativeDays == null ? undefined : Number(watchedRelativeDays);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endMonth = new Date(today.getFullYear() + 10, 11, 1);

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium">受講期限</legend>
      <Controller
        control={control}
        name={deadlineTypeName}
        render={() => (
          <RadioGroup value={deadlineType} onValueChange={onDeadlineTypeChange}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="none" id={`${idPrefix}-none`} />
              <Label htmlFor={`${idPrefix}-none`}>なし</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value="fixed_date"
                id={`${idPrefix}-fixed-date`}
              />
              <Label htmlFor={`${idPrefix}-fixed-date`}>一括日程</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value="relative_days"
                id={`${idPrefix}-relative-days`}
              />
              <Label htmlFor={`${idPrefix}-relative-days`}>
                開始日から○日後
              </Label>
            </div>
          </RadioGroup>
        )}
      />
      {deadlineType === 'fixed_date' && (
        <Controller
          control={control}
          name={fixedDateName}
          render={() => {
            const selectedDate = parseInputDate(fixedDate);
            return (
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button type="button" variant="outline">
                    {selectedDate
                      ? formatInputDate(selectedDate)
                      : '年月日を選択'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        onFixedDateChange(formatInputDate(date));
                        setIsCalendarOpen(false);
                      }
                    }}
                    disabled={(date) => date < today}
                    startMonth={startMonth}
                    endMonth={endMonth}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            );
          }}
        />
      )}
      {deadlineType === 'relative_days' && (
        <Controller
          control={control}
          name={relativeDaysName}
          render={() => (
            <Select
              value={relativeDays?.toString() ?? ''}
              onValueChange={(value) => onRelativeDaysChange(Number(value))}
            >
              <SelectTrigger aria-label="開始日からの日数">
                <SelectValue placeholder="日数を選択" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 31 }, (_, index) => index + 1).map(
                  (day) => (
                    <SelectItem key={day} value={String(day)}>
                      {day}日
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          )}
        />
      )}
      {fixedDateError && <p className={errorClass}>{fixedDateError}</p>}
      {relativeDaysError && <p className={errorClass}>{relativeDaysError}</p>}
    </fieldset>
  );
}
