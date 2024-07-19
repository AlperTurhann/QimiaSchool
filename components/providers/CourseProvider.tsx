"use client";
import React, { ReactNode, useCallback, useMemo } from "react";
import * as courseUtils from "@/utils/coursesUtils";
import { CourseContext, CourseContextType } from "@/context/CourseContext";

interface Props {
  children: ReactNode;
}

const CourseProvider = ({ children }: Props) => {
  const getCourses = useCallback(courseUtils.getCourses, []);
  const getCourse = useCallback(courseUtils.getCourse, []);
  const createCourse = useCallback(courseUtils.createCourse, []);
  const updateCourse = useCallback(courseUtils.updateCourse, []);
  const deleteCourse = useCallback(courseUtils.deleteCourse, []);

  const value = useMemo<CourseContextType>(
    () => ({
      getCourses,
      getCourse,
      createCourse,
      updateCourse,
      deleteCourse,
    }),
    [getCourses, getCourse, createCourse, updateCourse, deleteCourse]
  );

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

export default CourseProvider;
