import * as yup from 'yup';
import { StoreCourse } from '../types/StoreCourse';

export const StoreSchema: yup.Schema<StoreCourse> = yup.object().shape({
  title: yup.string().required('講座名を入力してください。'),
  image: yup
    .mixed<File>()
    .required('画像ファイルを選択してください。')
    .test('file', '画像ファイルを選択してください。', (value) => {
      if (value instanceof File === false) return false;
      return true;
    }),
});
