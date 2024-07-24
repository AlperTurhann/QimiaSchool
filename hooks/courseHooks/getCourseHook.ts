import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useCourseContext } from "@/context/CourseContext";
import { useAlertContext } from "@/context/AlertContext";

const useGetCourseHook = (courseID: string) => {
  const { showAlert } = useAlertContext();
  const { getCourse } = useCourseContext();
  const [course, setCourse] = useState<CourseProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCourse = await getCourse(courseID);
      if ("data" in fetchedCourse) {
        setCourse(fetchedCourse.data);
      } else {
        showAlert("Error", fetchedCourse.error);
      }
    } catch (error) {
      showAlert(
        "Error",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setLoading(false);
    }
  }, [getCourse, showAlert]);

  useEffect(() => {
    fetchCourse();
  }, [courseID, fetchCourse]);

  return { course, loading };
};

export default useGetCourseHook;
