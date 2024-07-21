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
  const [inviter, setInviter] = useState<UserProps | null>(null);
  const [invitedCourse, setInvitedCourse] = useState<CourseProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInviter = useCallback(
    async (inviterID: string) => {
      const fetchedInviter = await getUser(inviterID);
      if ("data" in fetchedInviter) {
        if (fetchedInviter.data) {
          setInviter(fetchedInviter.data);
        } else {
          showAlert("Error", fetchedInviter.message);
        }
      } else {
        showAlert("Error", fetchedInviter.error);
      }
    },
    [getUser]
  );

  const fetchInvitedCourse = useCallback(
    async (invitedCourseID: string) => {
      const fetchedInvitedCourse = await getCourse(invitedCourseID);
      if ("data" in fetchedInvitedCourse) {
        if (fetchedInvitedCourse.data) {
          setInvitedCourse(fetchedInvitedCourse.data);
        } else {
          showAlert("Error", fetchedInvitedCourse.message);
        }
      } else {
        showAlert("Error", fetchedInvitedCourse.error);
      }
    },
    [getCourse]
  );

  const fetchInvitation = useCallback(async () => {
    try {
      if (state.user) {
        await fetchInviter(invitation.invitingUserID);
        await fetchInvitedCourse(invitation.invitedCourseID);
      }
    } catch (error) {
      showAlert(
        "Error",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setLoading(false);
    }
  }, [fetchInviter, fetchInvitedCourse]);

  useEffect(() => {
    if (state.user) fetchInvitation();
  }, [invitation, fetchInvitation]);

  return { inviter, invitedCourse, loading };
};

export default useGetInvitationHook;
