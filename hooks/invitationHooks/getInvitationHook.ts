"use client";
import { useState, useEffect, useCallback } from "react";
import { InvitationProps } from "@/types/InvitationTypes";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { CourseProps } from "@/types/CourseTypes";
import { useCourseContext } from "@/context/CourseContext";

const useGetInvitationHook = (invitation: InvitationProps) => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { state, getUser } = useUserContext();
  const { getCourse } = useCourseContext();
  const [user, setUser] = useState<UserProps | null>(null);
  const [course, setCourse] = useState<CourseProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = useCallback(
    async (userID: string) => {
      const fetchedUser = await getUser(userID);
      if (typeof fetchedUser !== "string") {
        if (fetchedUser.data) {
          setUser(fetchedUser.data);
        } else {
          showAlert(fetchedUser.message);
        }
      } else {
        showErrorAlert(fetchedUser);
      }
    },
    [getUser, showAlert, showErrorAlert]
  );

  const fetchCourse = useCallback(
    async (courseID: string) => {
      const fetchedCourse = await getCourse(courseID);
      if (typeof fetchedCourse !== "string") {
        if (fetchedCourse.data) {
          setCourse(fetchedCourse.data);
        } else {
          showAlert(fetchedCourse.message);
        }
      } else {
        showErrorAlert(fetchedCourse);
      }
    },
    [getCourse, showAlert, showErrorAlert]
  );

  const fetchInvitation = useCallback(async () => {
    try {
      if (state.user) {
        await fetchUser(invitation.userID);
        await fetchCourse(invitation.courseID);
      }
    } catch (error) {
      showErrorAlert("transactionError");
    } finally {
      setLoading(false);
    }
  }, [fetchUser, fetchCourse, showAlert, showErrorAlert]);

  useEffect(() => {
    if (state.user) fetchInvitation();
  }, [state.user, invitation, fetchInvitation]);

  return { user, course, loading };
};

export default useGetInvitationHook;
