"use client";
import React, { cloneElement, ReactElement, ReactNode } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetEnrolledUsersHook from "@/hooks/courseHooks/getEnrolledUsersHook";
import useCreateCourseHook from "@/hooks/courseHooks/createCourseHook";
import useUpdateCourseHook from "@/hooks/courseHooks/updateCourseHook";
import useGetAppliedUsersHook from "@/hooks/courseHooks/getAppliedUsersHook";
import { CourseProps, CreateCourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { CourseData, useCourseSchema } from "@/utils/validations/CourseSchema";
import { useUserContext } from "@/context/UserContext";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import EnrolledStudents from "@/components/shared/EnrolledStudents";
import Loading from "@/components/shared/Loading";
import AppliedStudents from "@/components/shared/AppliedStudents";

interface Props {
  children: ReactNode;
  course?: CourseProps;
}

const CourseFormComponent = ({ children, course }: Props) => {
  const t = useTranslations("forms.course");
  const courseSchema = useCourseSchema();

  const form = useForm<CourseData>({
    resolver: zodResolver(courseSchema),
    defaultValues: course
      ? {
          name: course.name,
          description: course.description,
          capacity: course.capacity,
          accessLevel: course.accessLevel,
        }
      : undefined,
  });
  const { handleSubmit, control } = form;

  const { state } = useUserContext();
  const {
    enrolledUsers,
    setEnrolledUsers,
    loading: enrolledUsersLoading,
  } = useGetEnrolledUsersHook(course);
  const {
    appliedUsers,
    setAppliedUsers,
    loading: appliedUsersLoading,
  } = useGetAppliedUsersHook(course);
  const { createCourse, loading: createCourseLoading } = useCreateCourseHook();
  const { updateCourse, loading: updateCourseLoading } = useUpdateCourseHook();

  const handleKickStudent = (studentID: string) => {
    setEnrolledUsers(
      enrolledUsers.filter(
        (enrolledStudent) => enrolledStudent.id !== studentID
      )
    );
  };

  const handleAcceptStudent = (student: UserProps) => {
    setEnrolledUsers((prevEnrolledUsers) => [...prevEnrolledUsers, student]);
    setAppliedUsers(
      appliedUsers.filter((appliedStudent) => appliedStudent.id !== student.id)
    );
  };

  const handleDeclineStudent = (studentID: string) => {
    setAppliedUsers(
      appliedUsers.filter((appliedStudent) => appliedStudent.id !== studentID)
    );
  };

  const onSubmit = async (data: FieldValues) => {
    if (!course) {
      const createCourseData: CreateCourseProps = {
        name: data.name,
        description: data.description,
        instructor: state.user?.id ?? "",
        capacity: data.capacity,
        accessLevel: data.accessLevel,
      };

      createCourse(createCourseData);
    } else {
      const updateCourseData: CourseProps = {
        id: course.id,
        name: data.name,
        description: data.description,
        instructor: course.instructor,
        capacity: data.capacity,
        accessLevel: data.accessLevel,
        enrolledStudents: enrolledUsers.map((user) => user.id),
        appliedStudents: appliedUsers.map((user) => user.id),
      };

      updateCourse(updateCourseData);
    }
  };

  if (
    enrolledUsersLoading ||
    appliedUsersLoading ||
    createCourseLoading ||
    updateCourseLoading
  )
    return <Loading />;
  return (
    <div className="size-full flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-14 px-5 py-10 shadow-md rounded-xl bg-white md:w-2/3 lg:w-1/2"
        >
          <h1 className="font-bold capitalize sm:text-lg md:text-xl lg:text-2xl">
            {course ? t("editCourse") : t("createCourse")}
          </h1>
          <div className="w-full flex flex-col gap-y-7">
            {React.Children.map(children, (child) =>
              cloneElement(child as ReactElement<any>, { control })
            )}
          </div>
          {course && (
            <div className="w-[95%] flex flex-col gap-5 sm:w-2/3">
              <EnrolledStudents
                type="edit"
                enrolledUsers={enrolledUsers}
                handleKickStudent={handleKickStudent}
              />
              <AppliedStudents
                appliedUsers={appliedUsers}
                handleAcceptStudent={handleAcceptStudent}
                handleDeclineStudent={handleDeclineStudent}
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full text-xs capitalize shadow-xl p-2 bg-sky-700 hover:bg-sky-600 sm:w-1/2 md:text-sm md:w-1/3 lg:text-base"
          >
            {course ? t("editCourse") : t("createCourse")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CourseFormComponent;
