import { CourseProps, CreateCourseProps } from "@/types/CourseTypes";
import { SuccessResponse } from "@/types/ResponseTypes";
import { parseJSON } from "@/utils/fileUtils/IFileUtils";

const getCourses = async (): Promise<
  SuccessResponse<CourseProps[]> | APIErrorsKeys
> => {
  try {
    const response = await fetch("/api/auth/courses");
    return await parseJSON<CourseProps[]>(response);
  } catch (error) {
    return "transactionError";
  }
};

const getCourse = async (
  courseID: string
): Promise<SuccessResponse<CourseProps> | APIErrorsKeys> => {
  try {
    const response = await fetch(`/api/auth/courses/${courseID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseID),
    });
    return await parseJSON<CourseProps>(response);
  } catch (error) {
    return "transactionError";
  }
};

const createCourse = async (
  data: CreateCourseProps
): Promise<SuccessResponse<string> | APIErrorsKeys> => {
  try {
    const response = await fetch("/api/auth/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await parseJSON<string>(response);
  } catch (error) {
    return "transactionError";
  }
};

const updateCourse = async (
  currentUserID: string,
  data: CourseProps
): Promise<SuccessResponse<boolean> | APIErrorsKeys> => {
  try {
    const response = await fetch(`/api/auth/courses/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentUserID, ...data }),
    });
    return await parseJSON<boolean>(response);
  } catch (error) {
    return "transactionError";
  }
};

const deleteCourse = async (
  courseID: string
): Promise<SuccessResponse<boolean> | APIErrorsKeys> => {
  try {
    const response = await fetch(`/api/auth/courses/${courseID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseID),
    });
    return await parseJSON<boolean>(response);
  } catch (error) {
    return "transactionError";
  }
};

export { getCourses, getCourse, createCourse, updateCourse, deleteCourse };
