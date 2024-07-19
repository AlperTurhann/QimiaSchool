"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import coursePageHook from "@/hooks/courseHooks/coursePageHook";
import useLeaveCourseHook from "@/hooks/userHooks/leaveCourseHook";
import useEnrollCourseHook from "@/hooks/userHooks/enrollCourseHook";
import useDeleteCourseHook from "@/hooks/courseHooks/deleteCourseHook";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import EnrolledStudents from "@/components/shared/EnrolledStudents";
import Loading from "@/components/shared/Loading";

const CoursePage = () => {
  const { state } = useUserContext();
  const { courseID } = useParams<{ courseID: string }>();
  const navigate = useRouter();

  const { course, instructor, enrolledUsers, loading } =
    coursePageHook(courseID);
  const { handleLeaveCourse } = useLeaveCourseHook();
  const { handleEnrollCourse } = useEnrollCourseHook();
  const { handleDeleteCourse } = useDeleteCourseHook();

  if (!course) return <p>Course not found!</p>;
  else if (!instructor) return null;
  else if (loading) return <Loading />;

  const isEnrolled: boolean = state.user
    ? state.user.courses.includes(courseID)
    : false;
  const isEnrollable: boolean =
    course.capacity > course.enrolledStudents.length && !isEnrolled;

  const handleClickEnroll = () => {
    if (isEnrolled) {
      handleLeaveCourse(courseID);
    } else {
      handleEnrollCourse(courseID);
    }
  };

  const handleClickDelete = () => {
    handleDeleteCourse(courseID);
    navigate.push("/");
  };

  return (
    <main className="w-full h-full relative flex flex-col items-center text-center gap-5">
      <Button
        type="button"
        variant="link"
        onClick={() => navigate.push(`/users/${course.instructor}`)}
        className="z-10 absolute top-0 right-0"
      >
        <span className="text-xs text-gray-500 md:text-sm">
          <strong>Instructor: </strong>
          {instructor.name}
        </span>
      </Button>
      <h1 className="text-2xl font-bold mt-7 sm:mt-0">{course.name}</h1>
      <p>{course.description}</p>
      <EnrolledStudents type="view" enrolledUsers={enrolledUsers} />
      <div className={`${!state.user && "hidden"}`}>
        <div className={`${state.user?.role !== "student" && "hidden"}`}>
          <Button
            type="button"
            onClick={handleClickEnroll}
            className={`${!isEnrollable && "hidden"}`}
          >
            Enroll in the course
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleClickEnroll}
            className={`${!isEnrolled && "hidden"}`}
          >
            De-enroll from the course
          </Button>
        </div>
        <Button
          type="button"
          variant="destructive"
          onClick={handleClickDelete}
          className={`${state.user?.role !== "instructor" && "hidden"}`}
        >
          Delete the course
        </Button>
      </div>
    </main>
  );
};

export default CoursePage;
