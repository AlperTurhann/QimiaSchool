import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { useCourseContext } from "@/context/CourseContext";
import { useUserContext } from "@/context/UserContext";

const useCoursePageHook = (courseID: string) => {
  const { getCourse } = useCourseContext();
  const { state, getUser } = useUserContext();
  const [course, setCourse] = useState<CourseProps | null>(null);
  const [instructor, setInstructor] = useState<UserProps | null>(null);
  const [enrolledUsers, setEnrolledUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCourse = await getCourse(courseID);
      setCourse(fetchedCourse);

      if (fetchedCourse) {
        const fetchedInstructor = await getUser(fetchedCourse.instructor);
        setInstructor(fetchedInstructor);

        if (state.user) {
          const fetchedEnrolledUsers = await Promise.all(
            fetchedCourse.enrolledStudents.map(getUser)
          );
          setEnrolledUsers(
            fetchedEnrolledUsers.filter((user) => user !== null)
          );
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [courseID, getCourse, getUser, state.user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { course, instructor, enrolledUsers, loading };
};

export default useCoursePageHook;
