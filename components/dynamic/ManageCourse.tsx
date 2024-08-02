"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import getCourseHook from "@/hooks/courseHooks/getCourseHook";
import CourseFormComponent from "@/components/shared/FormFields/CourseFormComponent";
import FormInput from "@/components/shared/FormFields/FormInput";
import Loading from "@/components/shared/Loading";
import Selector from "@/components/shared/FormFields/Selector";

const ManageCourse = () => {
  const { courseID } = useParams<{ courseID: string }>();
  const { course, loading } = getCourseHook(courseID);
  const t = useTranslations("components.manageCourse");

  if (loading) return <Loading />;
  if (!course) return <p>{t("noFound")}</p>;
  return (
    <CourseFormComponent course={course}>
      <FormInput name="name" type="course" />
      <FormInput name="description" textarea={true} type="course" />
      <FormInput name="capacity" type="course" />
      <Selector name="accessLevel" type="course" />
    </CourseFormComponent>
  );
};

export default ManageCourse;
