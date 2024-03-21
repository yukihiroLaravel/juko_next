import { NextPage } from "next";
import { InstructorLayout } from '@/components/organisms/header';
import { InstructorAuthWrapper } from '@/features/login/components/Auth/InstructorAuthWrapper';
import { useEffect, useState } from 'react';
import { Loading } from '@/components/utils/Loading';
import { SideBar } from '@/components/atoms/SideBar/SideBar';
import { ToggleButton } from '@/components/atoms/Button/ToggleButton';
import { ProgressBar } from '@/components/atoms/ProgressBar/ProgressBar';
import styled from 'styled-components';
import { StatusIcon } from '@/features/lesson/components/StatusIcon';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useRouter } from 'next/router';
import { useFetchInstructorChapters } from '@/features/chapter/hooks/useFetchInstructorChapters';
import { useFetchInstructorCourse } from '@/features/course/hooks/useFetchInstructorCourse';
import { Breadcrumb } from '@/components/atoms/Breadcrumb/Breadcrumb';
import { Movie } from '@/components/atoms/Movie/Movie';
import { Button } from '@/components/atoms/Button/Button';
import { LessonAttendanceStatus, LESSON_ATTENDANCE_STATUS, LessonList } from '@/features/lesson-attendance/types/LessonAttendance';

type Query = {
  courseId?: string;
  chapterId?: string;
  lessonId?: number;
};

const StyleSideBarList = styled('li')<{ isSelected: boolean }>`
  border-top: 1px solid #b5b5b5;
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ isSelected }) => isSelected && '#ddd'};
  cursor: pointer;
  padding: 0.5rem;
  :hover {
    opacity: 0.8;
  }
`;

const Index: NextPage = () => {
  const [isShowedSideBar, setIsShowedSideBar] = useState(true);
  const [width] = useWindowSize();
  const router = useRouter();
  const query: Query = router.query;
  const { chapter } = useFetchInstructorChapters({
    courseId: query.courseId,
    chapterId: query.chapterId,
  });
  const { course } = useFetchInstructorCourse({
    courseId: query.courseId,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lessonList, setLessonList] = useState<LessonList[]>([]);
  const updateLessonAttendanceStatus = (lessonId: number | undefined, status: LessonAttendanceStatus) => {
    setLessonList(prevStatus => {
      const newStatus = prevStatus.map(lesson => {
        if (lesson?.lesson_id === lessonId && lesson) {
          lesson.lessonAttendance.status = status;
        }
        return lesson;
      });
      return newStatus;
    });    
  };
  const lessonId = query.lessonId ? Number(query.lessonId) : 0;
  // 進捗は固定の値(0%)
  const calculateChapterProgeress = 0;

  useEffect(() => {
    if (chapter !== undefined) {
      setIsLoading(false);
      if (lessonList.length === 0) {
        const initialLessonList = chapter.lessons.map((lesson) => {
          return {
            ...lesson,
            lessonAttendance: {
              lesson_attendance_id: 1,
              status: LESSON_ATTENDANCE_STATUS.STATUS_BEFORE_ATTENDANCE,
            },
            isCurrentLesson: lesson.lesson_id === lessonId,
          };
        });
        if (initialLessonList) {
          setLessonList(initialLessonList);
        }
      }
    }
  }, [chapter]);
  
  // パン屑のリンクリスト
  const links = [
    {
      title: '講座一覧',
      href: '/instructor/courses',
    },
    {
      title: 'チャプター&レッスン一覧',
      href: `/instructor/chapters?course_id=${query.courseId}`,
    },
    {
      title: chapter?.title ?? '',
      href: '#',
    },
  ];

  const clickHandler = (lessonId: number) => () => {
    setLessonList(prevStatus => {
      const newStatus = prevStatus.map(lesson => {
        if (lesson?.lesson_id === lessonId && lesson) {
          lesson.isCurrentLesson = true;
        } else if(lesson?.lesson_id !== lessonId && lesson){
          lesson.isCurrentLesson = false;
        }
        return lesson;
      });
      return newStatus;
    }); 
  };

  return (
    <InstructorAuthWrapper>
      <InstructorLayout>
        <div className="flex">
          {isLoading ? (
            <div className="mx-auto my-10 min-h-[100vh] w-3/4">
              <Loading />
            </div>
          ) : (
            <>
              {isShowedSideBar ? (
                <SideBar>
                  <ul className="mt-2">
                    <li className="mb-10">
                      <div className="text-center">
                        <p className="mb-3 font-semibold">
                          チャプター進捗 {calculateChapterProgeress}%
                        </p>
                        <ProgressBar progress={calculateChapterProgeress} />
                      </div>
                    </li>
                    {lessonList.map((lesson) => {
                      return (
                        lesson && (
                          <StyleSideBarList
                            key={lesson.lesson_id}
                            onClick={clickHandler(lesson.lesson_id)}
                            isSelected={lesson.isCurrentLesson}
                          >
                            <p className="text-xl	text-[#6D8DFF]">
                              {lesson.title}
                            </p>
                            <StatusIcon
                              status={lesson.lessonAttendance.status}
                              size="small"
                            />
                          </StyleSideBarList>
                        )
                      );
                    })}
                  </ul>
                  <ToggleButton
                    isShowedSideBar={isShowedSideBar}
                    setIsShowedSideBar={setIsShowedSideBar}
                  />
                </SideBar>
              ) : (
                <ToggleButton
                  isShowedSideBar={isShowedSideBar}
                  setIsShowedSideBar={setIsShowedSideBar}
                />
              )}
              <div className="mx-auto mb-10 min-h-[100vh] w-3/4">
                <Breadcrumb links={links} />
                  <div className="mt-10 border-b border-black pb-5">
                    <h2 className="text-3xl font-semibold md:text-4xl">
                      {course?.title}
                    </h2>
                  </div>
                  <ul className="my-5 border-b border-black md:hidden">
                  <li className="mb-10">
                    <div className="text-center">
                      <p className="mb-3 font-semibold">
                        チャプター進捗 {calculateChapterProgeress}%
                      </p>
                      <ProgressBar progress={calculateChapterProgeress} />
                    </div>
                  </li>
                  {lessonList.map((lesson) => {
                    return (
                      lesson && (
                        <StyleSideBarList
                          key={lesson.lesson_id}
                          onClick={clickHandler(lesson.lesson_id)}
                          isSelected={lesson.isCurrentLesson}
                        >
                          <p className="text-xl	text-[#6D8DFF]">{lesson.title}</p>
                          <StatusIcon
                            status={lesson.lessonAttendance.status}
                            size="small"
                          />
                        </StyleSideBarList>
                      )
                    );
                  })}
                </ul>
                <div className="mx-auto mt-5">
                  <h2 className="text-[25px] font-semibold md:text-[30px]">
                    {lessonList.find(lesson => lesson?.isCurrentLesson === true)?.title}
                  </h2>
                </div>
                <div className="my-5 overflow-auto">
                  {(width as number) > 0 && (
                    <Movie
                      videoId={lessonList.find(lesson => lesson?.isCurrentLesson === true)?.url || ''}
                      height={(width as number) > 640 ? 405 : 180}
                      width={(width as number) > 640 ? 720 : 320}
                    />
                  )}
                </div>
                {(
                  <>
                    <div className="flex justify-start gap-10">
                      <Button type="button" color={lessonList.find(lesson => lesson?.isCurrentLesson === true)?.lessonAttendance.status === LESSON_ATTENDANCE_STATUS.STATUS_BEFORE_ATTENDANCE
                          ? 'primary' : 'secondary'} 
                          clickHandler={() => {updateLessonAttendanceStatus(lessonList.find(lesson => lesson?.isCurrentLesson === true)?.lesson_id, LESSON_ATTENDANCE_STATUS.STATUS_BEFORE_ATTENDANCE)}}>
                        Lesson未実施
                      </Button>
                      <Button type="button" color={lessonList.find(lesson => lesson?.isCurrentLesson === true)?.lessonAttendance.status === LESSON_ATTENDANCE_STATUS.STATUS_IN_ATTENDANCE 
                          ? 'primary' : 'secondary'} 
                          clickHandler={() => {updateLessonAttendanceStatus(lessonList.find(lesson => lesson?.isCurrentLesson === true)?.lesson_id, LESSON_ATTENDANCE_STATUS.STATUS_IN_ATTENDANCE)}}>
                        Lesson開始
                      </Button>
                      <Button type="button" color={lessonList.find(lesson => lesson?.isCurrentLesson === true)?.lessonAttendance.status === LESSON_ATTENDANCE_STATUS.STATUS_COMPLETED_ATTENDANCE 
                          ? 'primary' : 'secondary'} 
                          clickHandler={() => {updateLessonAttendanceStatus(lessonList.find(lesson => lesson?.isCurrentLesson === true)?.lesson_id, LESSON_ATTENDANCE_STATUS.STATUS_COMPLETED_ATTENDANCE)}}>
                        Lesson完了
                      </Button>
                    </div>
                  </>
                )}
                <div className="mt-5">
                  <p className="whitespace-pre-wrap">
                    {lessonList.find(lesson => lesson?.isCurrentLesson === true)?.remarks}
                  </p>
                </div>
              </div>
            </>
        )}
        </div>
      </InstructorLayout>  
    </InstructorAuthWrapper>
  );
}

export default Index;