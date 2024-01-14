import * as yup from 'yup';
import { PutStudent } from '../types/PutStudent';

export const PutSchema: yup.Schema<PutStudent> = yup.object().shape({
  nick_name: yup
    .string()
    .max(50, 'ニックネームは50文字以内で入力してください')
    .required('ニックネームを入力してください'),
  last_name: yup
    .string()
    .max(50, '姓は50文字以内で入力してください')
    .required('姓を入力してください'),
  first_name: yup
    .string()
    .max(50, '名は50文字以内で入力してください')
    .required('名を入力してください'),
  email: yup
    .string()
    .email('メールアドレスの形式が正しくありません')
    .required('メールアドレスを入力してください'),
  occupation: yup
    .string()
    .max(50, '職業は50文字以内で入力してください')
    .required('職業を入力してください'),
  purpose: yup
    .string()
    .max(50, '目的は50文字以内で入力してください')
    .required('目的を入力してください'),
  birth_date: yup.date().required('生年月日を入力してください'),
  sex: yup
    .string()
    .test('sex', '性別を選択してください', (value) => {
      if (value !== 'man' && value !== 'woman') {
        return false;
      }
      return true;
    })
    .required('性別を選択してください'),
  address: yup
    .string()
    .max(255, '住所は255文字以内で入力してください')
    .required('住所を入力してください'),
  image: yup
    .mixed<File>()
    .nullable()
    .test('fileSize', 'ファイルサイズは10MBまでです', (value) => {
      if (value === null) return true;
      if (value === undefined) return true;
      return value.size <= 1024 * 1024 * 10;
    })
    .default(null),
});
