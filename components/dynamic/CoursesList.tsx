"use client";
import React from "react";
import getCoursesHook from "@/hooks/courseHooks/getCoursesHook";
import { CourseProps } from "@/types/CourseTypes";
import CourseCard from "@/modules/Course";
import { useSearchContext } from "@/context/SearchContext";
import Loading from "@/components/shared/Loading";
import SearchBar from "@/components/shared/SearchBar";

const CoursesList = () => {
  const { state } = useSearchContext();
  const { courses, loading } = getCoursesHook();

  if (loading) return <Loading />;
  return (
    <>
      <SearchBar items={courses} />
      <div className="marginTopUntilSm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.finalResults.length > 0 ? (
          <>
            {state.finalResults
              .filter(
                (result): result is CourseProps => "enrolledStudents" in result
              )
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </>
        ) : (
          <>
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CoursesList;
