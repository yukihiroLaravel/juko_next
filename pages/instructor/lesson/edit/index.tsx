import { Breadcrumb } from '@/components/atoms/Breadcrumb/Breadcrumb';
import { SideBar } from '@/components/atoms/SideBar/SideBar';
import { SideBarList } from '@/components/atoms/SideBar/SideBarList';
import { ToggleButton } from '@/components/atoms/Button/ToggleButton';
import { InstructorLayout } from '@/components/organisms/header';
import { Error } from '@/components/utils/Error';
import { useFetchInstructorChapters } from '@/features/chapter/hooks/useFetchInstructorChapters';
import { EditForm } from '@/features/lesson/components/EditForm';
import { Lesson } from '@/features/lesson/types/Lesson';
import { InstructorAuthWrapper } from '@/features/login/components/Auth/InstructorAuthWrapper';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Index: NextPage = () => {
  const router = useRouter();

  const [isShowedSideBar, setIsShowedSideBar] = useState(true);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const { course_id, chapter_id, lesson_id } = router.query;
  const { chapter, isLoading, error, mutate } = useFetchInstructorChapters({
    courseId: course_id,
    chapterId: chapter_id,
  });

  const clickHandler = (lessonId: number) => () => {
    const newLesson =
      chapter?.lessons.find((lesson) => lesson.lesson_id === lessonId) ?? null;
    setCurrentLesson(newLesson);
  };

  // パン屑のリンクリスト
  const links = [
    {
      title: '講座一覧',
      href: '/instructor/courses',
    },
    {
      title: 'チャプター&レッスン一覧',
      href: `/instructor/chapters?course_id=${course_id}`,
    },
    {
      title: chapter?.title ?? '',
      href: '#',
    },
  ];

  const courseId = Number(course_id);
  const chapterId = Number(chapter_id);

  // コンテンツを表示するかどうか
  const isDisplay =
    !isLoading &&
    currentLesson &&
    courseId &&
    chapterId &&
    lesson_id &&
    chapter;

  useEffect(() => {
    if (currentLesson) {
      const newCurrentLesson = chapter?.lessons.find(
        (lesson) => lesson.lesson_id === currentLesson.lesson_id
      ) as Lesson;
      setCurrentLesson(newCurrentLesson);
      return
    }

    // クエリパラメータのlesson_idがある場合は、そのレッスンを表示する
    if (chapter?.lessons.length) {
      const newLesson = chapter.lessons.find(
        (lesson) => lesson.lesson_id === Number(lesson_id)
      ) as Lesson;
      setCurrentLesson(newLesson);
    }
  }, [chapter, lesson_id]);

  return (
    <InstructorAuthWrapper>
      <InstructorLayout>
        {error && <Error />}
        {isDisplay && (
          <div className="flex">
            {isShowedSideBar ? (
              <SideBar>
                <ul className="mt-2">
                  {chapter.lessons.map((lesson) => {
                    return (
                      <SideBarList
                        key={lesson.lesson_id}
                        onClick={clickHandler(lesson.lesson_id)}
                        isSelected={
                          lesson.lesson_id === currentLesson?.lesson_id
                        }
                      >
                        {lesson.title}
                      </SideBarList>
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
              <div className="my-10">
                <h2 className="text-3xl font-semibold">{chapter.title}</h2>
              </div>
              <EditForm
                key={currentLesson.lesson_id}
                courseId={courseId}
                chapterId={chapterId}
                lesson={currentLesson}
                mutate={mutate}
              />
            </div>
          </div>
        )}
      </InstructorLayout>
    </InstructorAuthWrapper>
  );
};

export default Index;
