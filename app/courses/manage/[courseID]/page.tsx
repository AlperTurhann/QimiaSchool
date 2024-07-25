"use client";
import React from "react";
import { useParams } from "next/navigation";
import getCourseHook from "@/hooks/courseHooks/getCourseHook";
import { useUserContext } from "@/context/UserContext";
import CourseFormComponent from "@/components/shared/FormFields/CourseFormComponent";
import FormInput from "@/components/shared/FormFields/FormInput";
import MustLogin from "@/components/shared/MustLogin";
import OnlyInstructor from "@/components/shared/OnlyInstructor";
import Loading from "@/components/shared/Loading";
import Selector from "@/components/shared/FormFields/Selector";

const EditCoursePage = () => {
  const { state } = useUserContext();
  const { courseID } = useParams<{ courseID: string }>();
  const { course, loading } = getCourseHook(courseID);

  if (!state.user) return <MustLogin />;
  if (state.user.role !== "instructor") return <OnlyInstructor />;
  if (loading) return <Loading />;
  if (!course) return <p>Course not found!</p>;
  return (
    <main className="w-full h-full flex flex-col items-center">
      <CourseFormComponent course={course}>
        <FormInput name="name" label="Course Name" />
        <FormInput
          name="description"
          label="Course Description"
          textarea={true}
        />
        <FormInput name="capacity" label="Course Capacity" />
        <Selector name="accessLevel" placeholder="Select an access level" />
      </CourseFormComponent>
    </main>
  );
};

export default EditCoursePage;
