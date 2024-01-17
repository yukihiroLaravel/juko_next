import { Chapter } from '@/features/chapter/types/Chapter';
import { FC, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Lesson } from '../types/Lesson';
import { Dragcard } from './DragCard';

type Props = {
  courseId: number;
  chapter: Chapter & {
    lessons: Lesson[];
  };
  mutate: () => void;
};

export const DragCardList: FC<Props> = ({ courseId, chapter, mutate }) => {
  // TODO ドラッグするたびにAPIへ送信する
  const handleDragEnd = (result) => {
    // dropped outside the list
    // if (!result.destination) {
    //   return;
    // }
    // const items = drug.drugs;
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);
    // console.log(items);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {chapter.lessons.map((lesson, index) => {
                return (
                  <Dragcard
                    key={lesson.lesson_id}
                    courseId={courseId}
                    chapterId={chapter.chapter_id}
                    lesson={lesson}
                    index={index}
                    mutate={mutate}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
