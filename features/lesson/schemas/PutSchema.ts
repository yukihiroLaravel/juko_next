import * as yup from 'yup';
import { PutLesson } from '../types/PutLesson';

export const PutSchema: yup.Schema<PutLesson> = yup.object().shape({
  title: yup
    .string()
    .max(50, 'タイトルは50文字以内です')
    .required('タイトルは必須です'),
  remarks: yup.string().required('テキストは必須です'),
  url: yup.string().required('URLは必須です'),
  status: yup.string().required('状態は必須です'),
});
