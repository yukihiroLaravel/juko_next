import * as yup from 'yup';
import { UpdateCourse } from '../types/UpdateCourse';

export const UpdateSchema: yup.Schema<UpdateCourse> = yup.object().shape({
  course_id: yup.number().required('講座IDを入力してください。'),
  title: yup.string().required('講座名を入力してください。'),
  status: yup.string().oneOf(['public', 'private']).required('公開設定を選択してください。'),
  image: yup.mixed<File>().required('画像ファイルを選択してください。'),
});
