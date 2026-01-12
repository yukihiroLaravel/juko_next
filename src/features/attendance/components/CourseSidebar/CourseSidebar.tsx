"use client";

import { CourseSidebarUI } from "./CourseSidebar.ui";

export function CourseSidebar() {
  // ダミーデータ（後で API 連携予定）
  const course = {
    thumbnailUrl: "/dummy-thumbnail.png",
    categoryName: "プログラミング",
    courseName: "React 入門講座",
    progressPercent: 20,
  };

  return (
    <CourseSidebarUI
      thumbnailUrl={course.thumbnailUrl}
      categoryName={course.categoryName}
      courseName={course.courseName}
      progressPercent={course.progressPercent}
    />
  );
}
