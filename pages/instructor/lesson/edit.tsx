import { Breadcrumb } from '@/components/elements/Breadcrumb';
import { SideBar } from '@/components/elements/SideBar';
import { ToggleButton } from '@/components/elements/ToggleButton';
import { InstructorHeader } from '@/components/layouts/InstructorHeader';
import { useFetchInstructorChapters } from '@/features/chapter/hooks/useFetchInstructorChapters';
import { EditForm } from '@/features/lesson/components/EditForm';
import { Lesson } from '@/features/lesson/types/Lesson';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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

const Edit: NextPage = () => {
  const router = useRouter();

  const [isShowedSideBar, setIsShowedSideBar] = useState(true);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const { course_id, chapter_id, lesson_id } = router.query;
  const { chapter, isLoading } = useFetchInstructorChapters({
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
      href: '/courses',
    },
    {
      title: '講座詳細',
      href: '#',
    },
    {
      title: chapter?.title ?? '',
      href: '#',
    },
  ];

  useEffect(() => {
    if (chapter?.lessons.length) {
      const newLesson = chapter?.lessons[0] as Lesson;
      setCurrentLesson(newLesson);
    }
  }, [chapter]);

  return (
    <>
      {/* ヘッダー */}
      <InstructorHeader />
      <div className="flex">
        {/* サイドバー */}
        {isShowedSideBar ? (
          <SideBar>
            <ul className="mt-2">
              {chapter?.lessons.map((lesson) => {
                return (
                  <StyleSideBarList
                    key={lesson.lesson_id}
                    onClick={clickHandler(lesson.lesson_id)}
                    isSelected={lesson.lesson_id === currentLesson?.lesson_id}
                  >
                    <p className="text-xl	text-[#6D8DFF]">{lesson.title}</p>
                  </StyleSideBarList>
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
        {/* コンテンツ */}
        <div className="w-3/4 mx-auto min-h-[100vh] mb-10">
          <Breadcrumb links={links} />
          <div className="my-10">
            <h2 className="font-semibold text-3xl ml-20">{chapter?.title}</h2>
          </div>
          {!isLoading && currentLesson && <EditForm lesson={currentLesson} />}
        </div>
      </div>
    </>
  );
};

export default Edit;
