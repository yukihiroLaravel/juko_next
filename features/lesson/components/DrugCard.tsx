import { Chapter } from '@/features/chapter/types/Chapter';
import { FC } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Lesson } from '../types/Lesson';

type Props = {
  chapter: Chapter & {
    lessons: Lesson[];
  };
};

export const DrugCard: FC<Props> = ({ chapter }) => {
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
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapter.lessons.map((lesson, index) => {
              return (
                <Draggable
                  key={lesson.lesson_id}
                  draggableId={lesson.lesson_id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div key={lesson.lesson_id} className="my-5">
                        <div className="bg-[#ECF7FF] shadow-md rounded-md p-8 flex justify-between items-center">
                          <div className="text-xl">{lesson.title}</div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-dots-vertical text-gray-500"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                            <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                            <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
