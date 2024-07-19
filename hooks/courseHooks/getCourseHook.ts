import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useCourseContext } from "@/context/CourseContext";

const useGetCourseHook = (courseID: string) => {
  const { getCourse } = useCourseContext();
  const [course, setCourse] = useState<CourseProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCourse = await getCourse(courseID);
      setCourse(fetchedCourse);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [getCourse]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse, courseID]);

  return { course, loading };
};

export default useGetCourseHook;
