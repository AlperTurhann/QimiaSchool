"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import useDeleteCourseHook from "@/hooks/courseHooks/deleteCourseHook";
import useGetUserCoursesHook from "@/hooks/userHooks/getUserCoursesHook";
import CourseCard from "@/modules/Course";
import { useUserContext } from "@/context/UserContext";
import MustLogin from "@/components/shared/MustLogin";
import OnlyInstructor from "@/components/shared/OnlyInstructor";
import { Button } from "@/components/ui/button";
import Loading from "@/components/shared/Loading";

const ManageCoursePage = () => {
  const navigate = useRouter();

  const { state } = useUserContext();

  const { courses, setCourses, loading } = useGetUserCoursesHook(state.user);
  const { handleDeleteCourse } = useDeleteCourseHook(setCourses);

  if (!state.user) return <MustLogin />;
  else if (state.user.role !== "instructor") return <OnlyInstructor />;
  else if (loading) return <Loading />;
  return (
    <main className="w-full h-full flex flex-col items-center">
      <h1 className="text-center text-2xl font-bold p-5">Manage Courses</h1>
      <div className="w-2/3 flex flex-col gap-5">
        {courses.map((course) => (
          <div key={course.id} className="w-full h-full relative">
            <CourseCard course={course} courseInstructor={state.user} />
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
          </div>
        ))}
      </div>
    </main>
  );
};

export default ManageCoursePage;
