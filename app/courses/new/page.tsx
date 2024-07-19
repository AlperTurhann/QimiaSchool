"use client";
import React from "react";
import CourseFormComponent from "@/components/shared/FormFields/CourseFormComponent";
import FormInput from "@/components/shared/FormFields/FormInput";
import { useUserContext } from "@/context/UserContext";
import MustLogin from "@/components/shared/MustLogin";
import OnlyInstructor from "@/components/shared/OnlyInstructor";

const CreateCoursePage = () => {
  const { state } = useUserContext();

  if (!state.user) return <MustLogin />;
  else if (state.user.role !== "instructor") return <OnlyInstructor />;
  return (
    <main className="w-full h-full flex flex-col items-center">
      <CourseFormComponent>
        <FormInput name="name" label="Course Name" />
        <FormInput
          name="description"
          label="Course Description"
          textarea={true}
        />
        <FormInput name="capacity" label="Course Capacity" />
      </CourseFormComponent>
    </main>
  );
};

export default CreateCoursePage;
