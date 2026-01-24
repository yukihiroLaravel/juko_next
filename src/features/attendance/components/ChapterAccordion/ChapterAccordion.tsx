import { useState } from "react";
import { ChapterAccordionUI } from "./ChapterAccordion.ui";
import { LessonItem } from "../LessonItem/LessonItem";
import { CSS } from '@dnd-kit/utilities';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  useSortable,
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';


type Lesson = {
  id: string
  title: string
  isCompleted: boolean
}

type Chapter = {
  id: string
  title: string
  lessons: Lesson[]
}

type ChapterAccordionProps = {
  chapter: Chapter
}

export function ChapterAccordion({ chapter }: ChapterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [
    lessons, 
    setLessons,
  ] = useState(chapter.lessons);

  const completedLessonCount = lessons.filter(
    lesson => lesson.isCompleted
  ).length;

  const totalLessonCount = lessons.length;

  const handleLessonDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLessons((prev) => {
      const oldIndex = prev.findIndex(l => l.id === active.id);
      const newIndex = prev.findIndex(l => l.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ChapterAccordionUI
        title={chapter.title}
        isOpen={isOpen}
        completedLessonCount={completedLessonCount}
        totalLessonCount={totalLessonCount}
        onToggle={handleToggle}
        dragHandleProps={{ ...attributes, ...listeners }}
      >
        {isOpen && (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleLessonDragEnd}
          >
            <SortableContext
              items={lessons.map(l => l.id)}
              strategy={verticalListSortingStrategy}
            >
              {lessons.map(lesson => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </ChapterAccordionUI>
    </div>
  );
}
