import type { FieldError } from 'react-hook-form';

export function errorMessage(error?: FieldError) {
  return typeof error?.message === 'string' ? error.message : undefined;
}