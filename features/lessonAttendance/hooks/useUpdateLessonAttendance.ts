import { Axios } from "@/lib/api";
import { Lesson } from "@/features/lesson/types/Lesson";
import { LessonAttendance } from "@/features/lesson/types/LessonAttendance";

type Args = {
    lesson_attendance_id: number | undefined;
    status: string;
}

export const useUpdateLessonAttendance = ({ lesson_attendance_id, status }: Args) => {
    console.log(lesson_attendance_id);
    console.log(status);
    Axios.patch('api/proxy/api/v1/lesson_attendance', {
        lesson_attendance_id: lesson_attendance_id,
        status: status
    }).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    });
};