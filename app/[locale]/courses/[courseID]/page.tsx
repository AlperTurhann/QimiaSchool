import React from "react";
import CourseInfos from "@/components/dynamic/CourseInfos";

const CoursePage = () => {
  return (
    <main className="w-full h-full relative flex flex-col items-center text-center gap-5">
      <CourseInfos />
    </main>
  );
};

export default CoursePage;
