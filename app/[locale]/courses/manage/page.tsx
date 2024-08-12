import React from "react";
import { useTranslations } from "next-intl";
import { CheckInstructor } from "@/components/dynamic/CheckInstructor";
import ManageCoursesList from "@/components/dynamic/ManageCoursesList";

const ManageCoursePage = () => {
  const t = useTranslations("pages.manageCourses");

  return (
    <CheckInstructor>
      <main className="size-full flex flex-col items-center">
        <h1 className="text-center text-2xl font-bold p-5">{t("title")}</h1>
        <ManageCoursesList />
      </main>
    </CheckInstructor>
  );
};

export default ManageCoursePage;
