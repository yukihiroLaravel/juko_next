import * as yup from 'yup';
import { StoreStudent } from '../types/StoreStudent';

export const UpdateStoreSchema: yup.Schema<StoreStudent> = yup.object().shape({
  studentId: yup.number().required(),
  nickName: yup.string().required('ニックネームを入力してください。'),
  lastName: yup.string().required('姓を入力してください。'),
  firstName: yup.string().required('名を入力してください。'),
  email: yup
    .string()
    .email('メールアドレスの形式が正しくありません。')
    .required('メールアドレスを入力してください。'),
  occupation: yup.string().required('職業を入力してください。'),
  purpose: yup.string().required('目的を入力してください。'),
  birthDate: yup.string().required('生年月日を入力してください。'),
  sex: yup
    .string()
    .test('sex', '性別を選択してください。', (value) => {
      if (value !== 'man' && value !== 'woman') {
        return false;
      }

      return true;
    })
    .required('性別を選択してください。'),
  address: yup.string().required('住所を入力してください。'),
});
