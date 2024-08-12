import React from "react";
import { useTranslations } from "next-intl";
import CoursesList from "@/components/dynamic/CoursesList";

const Courses = () => {
  const t = useTranslations("pages.courses");

  return (
    <main className="size-full">
      <h1 className="text-center text-2xl font-bold p-5">{t("title")}</h1>
      <CoursesList />
    </main>
  );
};

export default Courses;
