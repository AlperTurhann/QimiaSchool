"use client";
import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useCourseContext } from "@/context/CourseContext";
import { useAlertContext } from "@/context/AlertContext";

const useGetCourseHook = (courseID: string) => {
  const { showErrorAlert } = useAlertContext();
  const { getCourse } = useCourseContext();
  const [course, setCourse] = useState<CourseProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCourse = await getCourse(courseID);
      if (typeof fetchedCourse !== "string") {
        setCourse(fetchedCourse.data);
      } else {
        showErrorAlert(fetchedCourse);
      }
    } catch (error) {
      showErrorAlert("transactionError");
    } finally {
      setLoading(false);
    }
  }, [getCourse, showErrorAlert]);

  useEffect(() => {
    fetchCourse();
  }, [courseID, fetchCourse]);

  return { course, loading };
};

export default useGetCourseHook;
