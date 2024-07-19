import { CourseProps, CreateCourseProps } from "@/types/CourseTypes";
import { parseJSON } from "@/utils/fileUtils/IFileUtils";

const getCourses = async (): Promise<CourseProps[]> => {
  try {
    const response = await fetch("/api/auth/courses");
    const getCoursesData = await parseJSON(response);
    if (response.ok) {
      console.log(getCoursesData.message);
      return getCoursesData.courses;
    }
    console.error(getCoursesData.message);
    return [];
  } catch (error) {
    console.error("An error occurred during getting courses: ", error);
    return [];
  }
};
const getCourse = async (courseID: string): Promise<CourseProps | null> => {
  try {
    const response = await fetch(`/api/auth/courses/${courseID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseID),
    });

    const getCourseData = await parseJSON(response);
    if (response.ok) {
      console.log(getCourseData.message);
      return getCourseData.course;
    }
    console.error(getCourseData.message);
    return null;
  } catch (error) {
    console.error("An error occurred during getting course: ", error);
    return null;
  }
};

const createCourse = async (
  data: CreateCourseProps
): Promise<string | null> => {
  try {
    const response = await fetch("/api/auth/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const createCourseData = await parseJSON(response);
    if (response.ok) {
      console.log(createCourseData.message);
      return createCourseData.courseID;
    }
    console.error(createCourseData.message);
    return null;
  } catch (error) {
    console.error("An error occurred during creating course: ", error);
    return null;
  }
};

const updateCourse = async (data: CourseProps) => {
  try {
    const response = await fetch(`/api/auth/courses/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    });

    const updateCourseData = await parseJSON(response);
    if (response.ok) {
      console.log(updateCourseData.message);
    } else console.error(updateCourseData.message);
  } catch (error) {
    console.error("An error occurred during updating course: ", error);
  }
};

const deleteCourse = async (courseID: string) => {
  try {
    const response = await fetch(`/api/auth/courses/${courseID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseID),
    });

    const deleteCourseData = await response.json();
    if (response.ok) console.log(deleteCourseData.message);
    else console.error(deleteCourseData.message);
  } catch (error) {
    console.error("An error occurred during deleting course: ", error);
  }
};

export { getCourses, getCourse, createCourse, updateCourse, deleteCourse };
