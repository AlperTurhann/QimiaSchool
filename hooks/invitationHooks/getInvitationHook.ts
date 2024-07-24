import { useState, useEffect, useCallback } from "react";
import { InvitationProps } from "@/types/InvitationTypes";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { CourseProps } from "@/types/CourseTypes";
import { useCourseContext } from "@/context/CourseContext";

const useGetInvitationHook = (invitation: InvitationProps) => {
  const { showAlert } = useAlertContext();
  const { state, getUser } = useUserContext();
  const { getCourse } = useCourseContext();
  const [user, setUser] = useState<UserProps | null>(null);
  const [course, setCourse] = useState<CourseProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = useCallback(
    async (userID: string) => {
      const fetchedUser = await getUser(userID);
      if ("data" in fetchedUser) {
        if (fetchedUser.data) {
          setUser(fetchedUser.data);
        } else {
          showAlert("Error", fetchedUser.message);
        }
      } else {
        showAlert("Error", fetchedUser.error);
      }
    },
    [getUser, showAlert]
  );

  const fetchCourse = useCallback(
    async (courseID: string) => {
      const fetchedCourse = await getCourse(courseID);
      if ("data" in fetchedCourse) {
        if (fetchedCourse.data) {
          setCourse(fetchedCourse.data);
        } else {
          showAlert("Error", fetchedCourse.message);
        }
      } else {
        showAlert("Error", fetchedCourse.error);
      }
    },
    [getCourse, showAlert]
  );

  const fetchInvitation = useCallback(async () => {
    try {
      if (state.user) {
        await fetchUser(invitation.userID);
        await fetchCourse(invitation.courseID);
      }
    } catch (error) {
      showAlert(
        "Error",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setLoading(false);
    }
  }, [fetchUser, fetchCourse, showAlert]);

  useEffect(() => {
    if (state.user) fetchInvitation();
  }, [state.user, invitation, fetchInvitation]);

  return { user, course, loading };
};

export default useGetInvitationHook;
