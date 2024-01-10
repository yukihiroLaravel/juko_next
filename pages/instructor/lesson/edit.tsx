import { Breadcrumb } from '@/components/elements/Breadcrumb';
import { SideBar } from '@/components/elements/SideBar';
import { SideBarList } from '@/components/elements/SideBarList';
import { ToggleButton } from '@/components/elements/ToggleButton';
import { InstructorHeader } from '@/components/layouts/InstructorHeader';
import { Error } from '@/components/utils/Error';
import { useFetchInstructorChapters } from '@/features/chapter/hooks/useFetchInstructorChapters';
import { EditForm } from '@/features/lesson/components/EditForm';
import { Lesson } from '@/features/lesson/types/Lesson';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Edit: NextPage = () => {
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
      href: '#',
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
    // 既に現在のレッスンが設定されている場合は何もしない
    if (currentLesson) {
      return;
    }

    // クエリパラメータのlesson_idがある場合は、そのレッスンを表示する
    if (chapter?.lessons.length) {
      const newLesson = chapter.lessons.find(
        (lesson) => lesson.lesson_id === Number(lesson_id)
      ) as Lesson;
      setCurrentLesson(newLesson);
    }
  }, [chapter]);

  return (
    <>
      <InstructorHeader />
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
                      isSelected={lesson.lesson_id === currentLesson?.lesson_id}
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
          <div className="w-3/4 mx-auto min-h-[100vh] mb-10">
            <Breadcrumb links={links} />
            <div className="my-10">
              <h2 className="font-semibold text-3xl">{chapter.title}</h2>
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
    </>
  );
};

export default Edit;
