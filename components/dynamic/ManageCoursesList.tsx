"use client";
import React from "react";
import useGetUserCoursesHook from "@/hooks/userHooks/getUserCoursesHook";
import { CourseProps } from "@/types/CourseTypes";
import ManageCourse from "@/modules/ManageCourse";
import { useUserContext } from "@/context/UserContext";
import { useSearchContext } from "@/context/SearchContext";
import Loading from "@/components/shared/Loading";
import SearchBar from "@/components/shared/SearchBar";

const ManageCoursesList = () => {
  const { state } = useUserContext();
  const { state: searchState } = useSearchContext();

  const { courses, setCourses, loading } = useGetUserCoursesHook(state.user);

  if (loading) return <Loading />;
  return (
    <>
      <SearchBar items={courses} />
      <div className="marginTopUntilSm w-full flex flex-col gap-5 sm:w-2/3">
        {searchState.finalResults.length > 0 ? (
          <>
            {searchState.finalResults
              .filter(
                (course): course is CourseProps => "enrolledStudents" in course
              )
              .map((course) => (
                <ManageCourse
                  key={course.id}
                  course={course}
                  setCourses={setCourses}
                />
              ))}
          </>
        ) : (
          <>
            {courses.map((course) => (
              <ManageCourse
                key={course.id}
                course={course}
                setCourses={setCourses}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default ManageCoursesList;
