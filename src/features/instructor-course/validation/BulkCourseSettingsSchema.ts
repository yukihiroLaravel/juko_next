import { z } from 'zod';
import {
  capacitySchema,
  deadlineFields,
  withDeadlineValidation,
} from './CourseSettingsSchema';

export const bulkCapacitySchema = z.object({ capacity: capacitySchema });

export const bulkDeadlineSchema = z
  .object(deadlineFields)
  .superRefine(withDeadlineValidation);

export type BulkCapacitySchema = z.infer<typeof bulkCapacitySchema>;
export type BulkDeadlineSchema = z.infer<typeof bulkDeadlineSchema>;
