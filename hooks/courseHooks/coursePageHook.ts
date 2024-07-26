import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { useCourseContext } from "@/context/CourseContext";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useCoursePageHook = (courseID: string) => {
  const { showAlert } = useAlertContext();
  const { getCourse } = useCourseContext();
  const { state, getUser } = useUserContext();
  const [course, setCourse] = useState<CourseProps | null>(null);
  const [instructor, setInstructor] = useState<UserProps | null>(null);
  const [enrolledUsers, setEnrolledUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInstructor = useCallback(
    async (instructorID: string) => {
      const fetchedInstructor = await getUser(instructorID);
      if ("data" in fetchedInstructor) {
        setInstructor(fetchedInstructor.data);
      } else {
        showAlert("Error", fetchedInstructor.error);
      }
    },
    [getUser, showAlert]
  );

  const fetchEnrolledUsers = useCallback(
    async (studentIDs: string[]) => {
      if (state.user) {
        const fetchedEnrolledUsers = await Promise.all(
          studentIDs.map(async (studentID) => {
            const response = await getUser(studentID);
            return "data" in response ? response.data : null;
          })
        );
        setEnrolledUsers(fetchedEnrolledUsers.filter((user) => user !== null));
      }
    },
    [getUser]
  );

  const fetchCourse = useCallback(async () => {
    const fetchedCourse = await getCourse(courseID);
    if ("data" in fetchedCourse) {
      if (fetchedCourse.data) {
        setCourse(fetchedCourse.data);
        await fetchInstructor(fetchedCourse.data.instructor);
        await fetchEnrolledUsers(fetchedCourse.data.enrolledStudents);
      } else {
        showAlert("Error", fetchedCourse.message);
      }
    } else {
      showAlert("Error", fetchedCourse.error);
    }
  }, [getCourse, fetchInstructor, fetchEnrolledUsers, showAlert]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      await fetchCourse();
    } catch (error) {
      showAlert(
        "Error",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setLoading(false);
    }
  }, [fetchCourse, showAlert]);

  useEffect(() => {
    fetchData();
  }, [courseID, fetchData]);

  return { course, instructor, enrolledUsers, setEnrolledUsers, loading };
};

export default useCoursePageHook;
