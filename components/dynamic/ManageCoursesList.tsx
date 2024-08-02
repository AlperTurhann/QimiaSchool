"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import useDeleteCourseHook from "@/hooks/courseHooks/deleteCourseHook";
import useGetUserCoursesHook from "@/hooks/userHooks/getUserCoursesHook";
import CourseCard from "@/modules/Course";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import Loading from "@/components/shared/Loading";

const ManageCoursesList = () => {
  const { state } = useUserContext();
  const navigate = useRouter();

  const { courses, setCourses, loading } = useGetUserCoursesHook(state.user);
  const { handleDeleteCourse } = useDeleteCourseHook(setCourses);

  if (loading) return <Loading />;
  return (
    <div className="w-full flex flex-col gap-5 sm:w-2/3">
      {courses.map((course) => (
        <div key={course.id} className="w-full h-full relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate.push(`/courses/manage/${course.id}`)}
            className="z-10 absolute top-2 right-14"
          >
            <Pencil size={20} />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => handleDeleteCourse(course.id)}
            className="z-10 absolute top-2 right-2"
          >
            <Trash2 size={20} />
          </Button>
          <CourseCard
            course={course}
            courseInstructor={state.user}
            isManage={true}
          />
        </div>
      ))}
    </div>
  );
};

export default ManageCoursesList;
