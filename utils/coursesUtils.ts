import { CourseProps, CreateCourseProps } from "@/types/CourseTypes";
import { SuccessResponse, ErrorResponse } from "@/types/ResponseTypes";
import { parseJSON } from "@/utils/fileUtils/IFileUtils";

const getCourses = async (): Promise<
  SuccessResponse<CourseProps[]> | ErrorResponse
> => {
  try {
    const response = await fetch("/api/auth/courses");
    return await parseJSON<CourseProps[]>(response);
  } catch (error) {
    return {
      message: "An error occurred during getting courses",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const getCourse = async (
  courseID: string
): Promise<SuccessResponse<CourseProps> | ErrorResponse> => {
  try {
    const response = await fetch(`/api/auth/courses/${courseID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseID),
    });
    return await parseJSON<CourseProps>(response);
  } catch (error) {
    return {
      message: "An error occurred during getting course",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const createCourse = async (
  data: CreateCourseProps
): Promise<SuccessResponse<string> | ErrorResponse> => {
  try {
    const response = await fetch("/api/auth/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await parseJSON<string>(response);
  } catch (error) {
    return {
      message: "An error occurred during creating course",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const updateCourse = async (
  currentUserID: string,
  data: CourseProps
): Promise<SuccessResponse<boolean> | ErrorResponse> => {
  try {
    const response = await fetch(`/api/auth/courses/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentUserID, ...data }),
    });
    return await parseJSON<boolean>(response);
  } catch (error) {
    return {
      message: "An error occurred during updating course",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const deleteCourse = async (
  courseID: string
): Promise<SuccessResponse<boolean> | ErrorResponse> => {
  try {
    const response = await fetch(`/api/auth/courses/${courseID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseID),
    });
    return await parseJSON<boolean>(response);
  } catch (error) {
    return {
      message: "An error occurred during deleting course",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export { getCourses, getCourse, createCourse, updateCourse, deleteCourse };
