"use client";
import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { useCourseContext } from "@/context/CourseContext";
import { useAlertContext } from "@/context/AlertContext";

const useGetUserCoursesHook = (user: UserProps | null) => {
  const { showErrorAlert } = useAlertContext();
  const { getCourse } = useCourseContext();
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserCourses = useCallback(async () => {
    try {
      if (user) {
        setLoading(true);
        const fetchedUserCourses = await Promise.all(
          user.courses.map(async (courseID) => {
            const response = await getCourse(courseID);
            return typeof response !== "string" ? response.data : null;
          })
        );

        const validCourses = fetchedUserCourses.filter(
          (course) => course !== null
        );
        setCourses(validCourses);
      }
    } catch (error) {
      showErrorAlert("transactionError");
    } finally {
      setLoading(false);
    }
  }, [getCourse, showErrorAlert]);

  useEffect(() => {
    fetchUserCourses();
  }, [fetchUserCourses]);

  return { courses, setCourses, loading };
};

export default useGetUserCoursesHook;
