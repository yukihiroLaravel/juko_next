import * as yup from 'yup';
import { PutInstructor } from '../types/PutInstructor';

export const PutSchema: yup.Schema<PutInstructor> = yup.object().shape({
  nick_name: yup.string().required('ニックネームを入力してください。'),
  last_name: yup.string().required('姓を入力してください。'),
  first_name: yup.string().required('名を入力してください。'),
  email: yup
    .string()
    .email('メールアドレスの形式が正しくありません。')
    .required('メールアドレスを入力してください。'),
  image: yup
    .mixed<File>()
    .nullable()
    .test('fileSize', 'ファイルサイズは10MBまでです。', (value) => {
      if (value === null) return true;
      if (value === undefined) return true;
      return value.size <= 1024 * 1024 * 10;
    })
    .default(null),
});
