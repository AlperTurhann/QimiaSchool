import React from "react";
import { CheckInstructor } from "@/components/dynamic/CheckInstructor";
import CourseFormComponent from "@/components/shared/FormFields/CourseFormComponent";
import FormInput from "@/components/shared/FormFields/FormInput";
import Selector from "@/components/shared/FormFields/Selector";

const CreateCoursePage = () => {
  return (
    <CheckInstructor>
      <main className="w-full h-full flex flex-col items-center">
        <CourseFormComponent>
          <FormInput name="name" type="course" />
          <FormInput name="description" textarea={true} type="course" />
          <FormInput name="capacity" type="course" />
          <Selector name="accessLevel" type="course" />
        </CourseFormComponent>
      </main>
    </CheckInstructor>
  );
};

export default CreateCoursePage;
