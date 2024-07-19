import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useCourseContext } from "@/context/CourseContext";

const useGetCoursesHook = () => {
  const { getCourses } = useCourseContext();
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [getCourses]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading };
};

export default useGetCoursesHook;
