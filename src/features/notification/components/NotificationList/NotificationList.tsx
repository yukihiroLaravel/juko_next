"use client";

import { useMemo, useState } from "react";
import { NotificationListUI } from "./NotificationList.ui";
import { Notification } from "../NotificationTable/NotificationTable.ui";

const PAGE_SIZE = 5;

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "領収書について",
    courseName: "PHPコース",
    courseDeadline: null,
    startDate: "2023/9/25",
  },
  {
    id: "2",
    title: "レッスンについて",
    courseName: "Javaコース",
    courseDeadline: "2024/12/31",
    startDate: "2024/1/1",
  },
  {
    id: "3",
    title: "課題提出について",
    courseName: "Reactコース",
    courseDeadline: "2024/6/30",
    startDate: "2024/2/15",
  },
  {
    id: "4",
    title: "メンテナンスのお知らせ",
    courseName: "共通",
    courseDeadline: null,
    startDate: "2024/3/10",
  },
  {
    id: "5",
    title: "修了証発行について",
    courseName: "PHPコース",
    courseDeadline: null,
    startDate: "2024/3/20",
  },
  {
    id: "6",
    title: "追加教材のお知らせ",
    courseName: "Javaコース",
    courseDeadline: null,
    startDate: "2024/4/1",
  },
];

export function NotificationList() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const sortedNotifications = useMemo(() => {
    return [...mockNotifications].sort((a, b) => {
      const aDate = new Date(a.startDate).getTime();
      const bDate = new Date(b.startDate).getTime();
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    });
  }, [sortOrder]);

  const totalPages = Math.ceil(sortedNotifications.length / PAGE_SIZE);

  const paginatedNotifications = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return sortedNotifications.slice(start, end);
  }, [sortedNotifications, currentPage]);

  const handleSortChange = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  return (
    <NotificationListUI
      notifications={paginatedNotifications}
      sortOrder={sortOrder}
      onSortChange={handleSortChange}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
