import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useGetAppliedUsersHook = (course: CourseProps | null | undefined) => {
  const { showAlert } = useAlertContext();
  const { getUser } = useUserContext();
  const [appliedUsers, setAppliedUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const checkAppliedUsers = useCallback(
    async (course: CourseProps) => {
      const fetchedAppliedUsers = await Promise.all(
        course.appliedStudents.map(async (appliedStudentID) => {
          const response = await getUser(appliedStudentID);
          return "data" in response ? response.data : null;
        })
      );
      const validUsers = fetchedAppliedUsers.filter((user) => user !== null);
      return validUsers;
    },
    [getUser]
  );

  const fetchAppliedUsers = useCallback(async () => {
    try {
      if (course) {
        setLoading(true);
        const fetchedAppliedUsers = await checkAppliedUsers(course);
        setAppliedUsers(fetchedAppliedUsers);
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
    fetchAppliedUsers();
  }, [course, fetchAppliedUsers]);

  return { appliedUsers, setAppliedUsers, loading };
};

export default useGetAppliedUsersHook;
