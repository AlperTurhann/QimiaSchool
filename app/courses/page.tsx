"use client";
import getCoursesHook from "@/hooks/courseHooks/getCoursesHook";
import { CourseProps } from "@/types/CourseTypes";
import CourseCard from "@/modules/Course";
import { useSearchContext } from "@/context/SearchContext";
import Loading from "@/components/shared/Loading";
import SearchBar from "@/components/shared/SearchBar";

const Courses = () => {
  const { state } = useSearchContext();
  const { courses, loading } = getCoursesHook();

  if (loading) return <Loading />;
  return (
    <main className="w-full h-full">
      <SearchBar items={courses} />
      <h1 className="marginTopUntilSm text-center text-2xl font-bold p-5">
        Courses
      </h1>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
          state.finalResults.length > 0 && "hidden"
        }`}
      >
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.finalResults
          .filter(
            (result): result is CourseProps => "enrolledStudents" in result
          )
          .map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
      </div>
    </main>
  );
};

export default Courses;
