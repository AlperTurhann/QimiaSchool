import { createContext, useContext } from "react";
import * as courseUtils from "@/utils/coursesUtils";

type CourseContextType = {
  getCourses: typeof courseUtils.getCourses;
  getCourse: typeof courseUtils.getCourse;
  createCourse: typeof courseUtils.createCourse;
  updateCourse: typeof courseUtils.updateCourse;
  deleteCourse: typeof courseUtils.deleteCourse;
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
};

export { CourseContext, useCourseContext };
export type { CourseContextType };
