import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";

const useGetEnrolledUsersHook = (course: CourseProps | undefined) => {
  const { getUser } = useUserContext();
  const [enrolledUsers, setEnrolledUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEnrolledUsers = useCallback(async () => {
    try {
      if (course) {
        setLoading(true);
        const fetchedEnrolledUsers = await Promise.all(
          course.enrolledStudents.map(
            async (enrolledStudentID) => await getUser(enrolledStudentID)
          )
        );

        setEnrolledUsers(fetchedEnrolledUsers.filter((user) => user !== null));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [course, getUser]);

  useEffect(() => {
    fetchEnrolledUsers();
  }, [fetchEnrolledUsers]);

  return { enrolledUsers, setEnrolledUsers, loading };
};

export default useGetEnrolledUsersHook;
