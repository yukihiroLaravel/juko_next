"use client";

import { useState } from "react";
import { CourseSearchBoxUI } from "./CourseSearchBox.ui";

export function CourseSearchBox() {
  const [keyword, setKeyword] = useState("");

  const handleChange = (value: string) => {
    setKeyword(value);
  };

  return (
    <CourseSearchBoxUI
      value={keyword}
      onChange={handleChange}
    />
  );
}
