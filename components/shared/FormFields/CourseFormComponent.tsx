"use client";
import React, { cloneElement, ReactElement, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetEnrolledUsersHook from "@/hooks/courseHooks/getEnrolledUsersHook";
import { CourseProps, CreateCourseProps } from "@/types/CourseTypes";
import { CourseData, CourseSchema } from "@/utils/validations/CourseSchema";
import { useCourseContext } from "@/context/CourseContext";
import { useUserContext } from "@/context/UserContext";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import EnrolledStudents from "@/components/shared/EnrolledStudents";
import Loading from "@/components/shared/Loading";

interface Props {
  children: ReactNode;
  course?: CourseProps;
}

const CourseFormComponent = ({ children, course }: Props) => {
  const formSchema = CourseSchema;

  const form = useForm<CourseData>({
    resolver: zodResolver(formSchema),
    defaultValues: course
      ? {
          name: course.name,
          description: course.description,
          capacity: course.capacity,
        }
      : undefined,
  });
  const { handleSubmit, control } = form;

  const { state, dispatch, getUser } = useUserContext();
  const { createCourse, updateCourse } = useCourseContext();
  const { enrolledUsers, setEnrolledUsers, loading } =
    useGetEnrolledUsersHook(course);
  const navigate = useRouter();

  const handleKickStudent = (studentID: string) => {
    setEnrolledUsers(
      enrolledUsers.filter(
        (enrolledStudent) => enrolledStudent.id !== studentID
      )
    );
  };

  const onSubmit = async (data: FieldValues) => {
    if (!course) {
      const createCourseData: CreateCourseProps = {
        name: data.name,
        description: data.description,
        instructor: state.user?.id ?? "",
        capacity: data.capacity,
      };

      const newCourseID = await createCourse(createCourseData);
      if (newCourseID) {
        const updatedInstructor = await getUser(createCourseData.instructor);
        dispatch({ type: "SET_USER", payload: updatedInstructor });
        navigate.push(`/courses/${newCourseID}`);
      }
    } else {
      const updateCourseData: CourseProps = {
        id: course.id,
        name: data.name,
        description: data.description,
        instructor: course.instructor,
        capacity: data.capacity,
        enrolledStudents: enrolledUsers.map((user) => user.id),
      };

      await updateCourse(updateCourseData);
      navigate.push(`/courses/${course.id}`);
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-14 px-5 py-10 shadow-md rounded-xl bg-white md:w-2/3 lg:w-1/2"
        >
          <h1 className="font-bold capitalize sm:text-lg md:text-xl lg:text-2xl">
            {course ? "Edit Course" : "Create Course"}
          </h1>
          <div className="w-full flex flex-col gap-y-7">
            {React.Children.map(children, (child) =>
              cloneElement(child as ReactElement<any>, { control })
            )}
          </div>
          {course && (
            <EnrolledStudents
              type="edit"
              enrolledUsers={enrolledUsers}
              handleKickStudent={handleKickStudent}
            />
          )}
          <Button
            type="submit"
            className="w-full text-xs capitalize p-2 sm:w-1/2 md:text-sm md:w-1/3 lg:text-base shadow-xl bg-sky-700 hover:bg-sky-600"
          >
            {course ? "Save Changes" : "Create Course"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CourseFormComponent;
