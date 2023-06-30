import Header from '@/components/layouts/Header';
import { ToggleButton } from '@/components/elements/ToggleButton';
import { ProgressBar } from '@/components/elements/ProgressBar';
import { SideBar } from '@/components/elements/SideBar';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Breadcrumb } from '@/components/elements/Breadcrumb';
import { StatusIcon } from '@/features/lesson/components/StatusIcon';
import { StatusButton } from '@/features/lessonAttendance/components/StatusButton';
import { Movie } from '@/components/elements/Movie';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useFetchChapter } from '@/hooks/useFetchChapter';
import { useRouter } from 'next/router';
import { Loading } from '@/components/utils/Loading';
import { Lesson } from '@/features/lesson/types/Lesson';
import { LessonAttendance } from '@/features/lessonAttendance/types/LessonAttendance';
import styled from 'styled-components';

type Query = {
  attendanceId?: string;
  chapterId?: string;
};

const STATUS_BEFORE_ATTENDANCE = 'before_attendance';
const STATUS_IN_ATTENDANCE = 'in_attendance';
const STATUS_COMPLETED_ATTENDANCE = 'completed_attendance';

const StyleSideBarList = styled.li<{ isSelected: boolean }>`
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

const Chapter: NextPage = () => {
  const [isShowedSideBar, setIsShowedSideBar] = useState(true);

  const [width] = useWindowSize();
  const router = useRouter();
  const query: Query = router.query;
  const [chapter] = useFetchChapter({
    attendanceId: query.attendanceId,
    chapterId: query.chapterId,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentLesson, setCurrentLesson] = useState<
    | (Lesson & {
        lessonAttendance: LessonAttendance;
      })
    | null
  >(null);

  const calculateChapterProgeress = (): number => {
    // チャプター取得前は0を返す
    if (chapter === undefined) return 0;

    // 合計レッスン数
    console.log(chapter);
    const lessonTotalCount = chapter.lessons.length;

    // 合計レッスン数が0の場合は、0を返す
    if (lessonTotalCount === 0) return 0;

    // 進捗完了レッスン数
    const completedLessonTotalCount = chapter.lessons.filter((lesson) => {
      return lesson.lessonAttendance?.status === STATUS_COMPLETED_ATTENDANCE;
    }).length;

    return Math.floor((completedLessonTotalCount / lessonTotalCount) * 100);
  };

  useEffect(() => {
    if (chapter !== undefined) {
      setIsLoading(false);
      setCurrentLesson(
        chapter.lessons[0] as Lesson & {
          lessonAttendance: LessonAttendance;
        }
      );
      return;
    }
  }, [chapter]);

  // パン屑のリンクリスト
  const links = [
    {
      title: '講座一覧',
      href: '/courses',
    },
    {
      title: '講座名',
      href: '/course',
    },
    {
      title: currentLesson?.title as string,
      href: '#',
    },
  ];

  const clickHandler = (lessonId: number) => () => {
    const newLesson = chapter.lessons.find((lesson) => lesson.lesson_id === lessonId) as Lesson & {
      lessonAttendance: LessonAttendance;
    };
    setCurrentLesson(newLesson);
  };

  return (
    <>
      <Header />
      <div className="flex">
        {isLoading ? (
          <div className="w-3/4 mx-auto min-h-[100vh] mt-10 mb-10">
            <Loading />
          </div>
        ) : (
          <>
            {isShowedSideBar ? (
              <SideBar>
                <ul className="mt-2">
                  <li className="mb-10">
                    <div className="text-center">
                      <p className="font-semibold mb-3">チャプター進捗 {calculateChapterProgeress()}%</p>
                      <ProgressBar progress={calculateChapterProgeress()} />
                    </div>
                  </li>
                  {chapter.lessons.map((lesson) => {
                    return (
                      <StyleSideBarList
                        key={lesson.lesson_id}
                        onClick={clickHandler(lesson.lesson_id)}
                        isSelected={lesson.lesson_id === currentLesson?.lesson_id}
                      >
                        <p className="text-xl	text-[#6D8DFF]">{lesson.title}</p>
                        <StatusIcon status={lesson.lessonAttendance.status} size="small" />
                      </StyleSideBarList>
                    );
                  })}
                </ul>
                <ToggleButton isShowedSideBar={isShowedSideBar} setIsShowedSideBar={setIsShowedSideBar} />
              </SideBar>
            ) : (
              <ToggleButton isShowedSideBar={isShowedSideBar} setIsShowedSideBar={setIsShowedSideBar} />
            )}

            <div className="w-3/4 mx-auto min-h-[100vh] mb-10">
              <Breadcrumb links={links} />
              <div className="mt-10 border-black border-b pb-5">
                <h2 className="font-semibold text-3xl md:text-4xl">{chapter.title}</h2>
              </div>
              <ul className="md:hidden my-5 border-black border-b">
                <li className="mb-10">
                  <div className="text-center">
                    <p className="font-semibold mb-3">チャプター進捗 {calculateChapterProgeress()}%</p>
                    <ProgressBar progress={calculateChapterProgeress()} />
                  </div>
                </li>
                {chapter.lessons.map((lesson) => {
                  return (
                    <StyleSideBarList
                      key={lesson.lesson_id}
                      onClick={clickHandler(lesson.lesson_id)}
                      isSelected={lesson.lesson_id === currentLesson?.lesson_id}
                    >
                      <p className="text-xl	text-[#6D8DFF]">{lesson.title}</p>
                      <StatusIcon status={lesson.lessonAttendance.status} size="small" />
                    </StyleSideBarList>
                  );
                })}
              </ul>
              <div className="mt-5 mx-auto">
                <h2 className="font-semibold text-[25px] md:text-[30px]">{currentLesson?.title}</h2>
              </div>
              <div className="my-5 overflow-auto">
                {(width as number) > 0 && currentLesson && (
                  <Movie
                    videoId={currentLesson.url}
                    height={(width as number) > 640 ? 405 : 180}
                    width={(width as number) > 640 ? 720 : 320}
                  />
                )}
              </div>
              {currentLesson && (
                <>
                  <div className="flex justify-start">
                    <StatusButton
                      selected={currentLesson?.lessonAttendance.status === STATUS_BEFORE_ATTENDANCE}
                      lessonAttendance={{
                        lesson_attendance_id: currentLesson.lessonAttendance.lesson_attendance_id,
                        status: STATUS_BEFORE_ATTENDANCE,
                      }}
                    >
                      Lesson未実施
                    </StatusButton>
                    <span className="ml-10" />
                    <StatusButton
                      selected={currentLesson?.lessonAttendance.status === STATUS_IN_ATTENDANCE}
                      lessonAttendance={{
                        lesson_attendance_id: currentLesson.lessonAttendance.lesson_attendance_id,
                        status: STATUS_IN_ATTENDANCE,
                      }}
                    >
                      Lesson開始
                    </StatusButton>
                    <span className="ml-10" />
                    <StatusButton
                      selected={currentLesson?.lessonAttendance.status === STATUS_COMPLETED_ATTENDANCE}
                      lessonAttendance={{
                        lesson_attendance_id: currentLesson.lessonAttendance.lesson_attendance_id,
                        status: STATUS_COMPLETED_ATTENDANCE,
                      }}
                    >
                      Lesson完了
                    </StatusButton>
                  </div>
                </>
              )}
              <div className="mt-5">
                <p className="whitespace-pre-wrap">{currentLesson?.remarks}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Chapter;
