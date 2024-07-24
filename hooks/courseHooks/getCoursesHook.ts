import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useCourseContext } from "@/context/CourseContext";
import { useAlertContext } from "@/context/AlertContext";

const useGetCoursesHook = () => {
  const { showAlert } = useAlertContext();
  const { getCourses } = useCourseContext();
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCourses = await getCourses();
      if ("data" in fetchedCourses) {
        setCourses(fetchedCourses.data ?? []);
      }
    } catch (error) {
      showAlert(
        "Error",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setLoading(false);
    }
  }, [getCourses, showAlert]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading };
};

export default useGetCoursesHook;
