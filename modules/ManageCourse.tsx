"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import useDeleteCourseHook from "@/hooks/courseHooks/deleteCourseHook";
import { CourseProps } from "@/types/CourseTypes";
import CourseCard from "@/modules/Course";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";

interface Props {
  course: CourseProps;
  setCourses: Dispatch<SetStateAction<CourseProps[]>>;
}

const ManageCourse = ({ course, setCourses }: Props) => {
  const { state } = useUserContext();
  const navigate = useRouter();

  const { handleDeleteCourse } = useDeleteCourseHook(setCourses);

  return (
    <div className="w-full h-full relative">
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
  );
};

export default ManageCourse;
