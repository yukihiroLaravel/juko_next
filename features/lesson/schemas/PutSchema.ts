import * as yup from 'yup';
import { PutLesson } from '../types/PutLesson';

export const PutSchema: yup.Schema<PutLesson> = yup.object().shape({
  title: yup.string().required(),
  remarks: yup.string().required(),
  url: yup.string().required(),
  status: yup.string().required(),
});
