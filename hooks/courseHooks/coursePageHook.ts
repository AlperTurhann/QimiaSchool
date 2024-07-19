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

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCourse = await getCourse(courseID);
      if ("data" in fetchedCourse) {
        if (fetchedCourse.data) {
          setCourse(fetchedCourse.data);
          const fetchedInstructor = await getUser(
            fetchedCourse.data.instructor
          );
          if ("data" in fetchedInstructor) {
            setInstructor(fetchedInstructor.data);
          } else {
            showAlert("Error", fetchedInstructor.error);
          }

          if (state.user) {
            const fetchedEnrolledUsers = await Promise.all(
              fetchedCourse.data.enrolledStudents.map(async (studentID) => {
                const response = await getUser(studentID);
                return "data" in response ? response.data : null;
              })
            );
            setEnrolledUsers(
              fetchedEnrolledUsers.filter((user) => user !== null)
            );
          }
        }
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
  }, [courseID, getCourse, getUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { course, instructor, enrolledUsers, setEnrolledUsers, loading };
};

export default useCoursePageHook;
