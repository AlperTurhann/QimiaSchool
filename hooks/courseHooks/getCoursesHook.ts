"use client";
import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useCourseContext } from "@/context/CourseContext";
import { useAlertContext } from "@/context/AlertContext";

const useGetCoursesHook = () => {
  const { showErrorAlert } = useAlertContext();
  const { getCourses } = useCourseContext();
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCourses = await getCourses();
      if (typeof fetchedCourses !== "string") {
        setCourses(fetchedCourses.data ?? []);
      }
    } catch (error) {
      showErrorAlert("transactionError");
    } finally {
      setLoading(false);
    }
  }, [getCourses, showErrorAlert]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading };
};

export default useGetCoursesHook;
