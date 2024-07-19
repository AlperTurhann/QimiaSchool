import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useCourseContext } from "@/context/CourseContext";
import { UserProps } from "@/types/UserTypes";

const useGetUserCoursesHook = (user: UserProps) => {
  const { getCourse } = useCourseContext();
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserCourses = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedUserCourses = await Promise.all(
        user.courses.map(
          async (createdCourseID) => await getCourse(createdCourseID)
        )
      );

      const validCourses = fetchedUserCourses.filter(
        (course) => course !== null
      );
      setCourses(validCourses);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user, getCourse]);

  useEffect(() => {
    fetchUserCourses();
  }, [fetchUserCourses]);

  return { courses, setCourses, loading };
};

export default useGetUserCoursesHook;
