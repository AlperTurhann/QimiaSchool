import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useGetEnrolledUsersHook = (course: CourseProps | undefined) => {
  const { showAlert } = useAlertContext();
  const { getUser } = useUserContext();
  const [enrolledUsers, setEnrolledUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEnrolledUsers = useCallback(async () => {
    try {
      if (course) {
        setLoading(true);
        const fetchedEnrolledUsers = await Promise.all(
          course.enrolledStudents.map(async (enrolledStudentID) => {
            const response = await getUser(enrolledStudentID);
            return "data" in response ? response.data : null;
          })
        );

        setEnrolledUsers(fetchedEnrolledUsers.filter((user) => user !== null));
      }
    } catch (error) {
      showAlert(
        "Error",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setLoading(false);
    }
  }, [getUser, showAlert]);

  useEffect(() => {
    fetchEnrolledUsers();
  }, [course, fetchEnrolledUsers]);

  return { enrolledUsers, setEnrolledUsers, loading };
};

export default useGetEnrolledUsersHook;
