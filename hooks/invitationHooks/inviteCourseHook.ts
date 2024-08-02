"use client";
import { useCallback, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useInvitationContext } from "@/context/InviteContext";

const useInviteCourseHook = () => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { inviteCourse } = useInvitationContext();
  const { state } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleInviteCourse = useCallback(
    async (
      invitedUserID: string,
      invitedCourseID: string
    ): Promise<boolean> => {
      let result: boolean = false;
      try {
        if (state.user) {
          setLoading(true);
          const isSuccesfull = await inviteCourse(
            state.user.id,
            invitedUserID,
            invitedCourseID
          );
          if (typeof isSuccesfull !== "string") {
            if (isSuccesfull.data) {
              showAlert(isSuccesfull.message);
              result = isSuccesfull.data;
            } else {
              showAlert(isSuccesfull.message);
            }
          } else {
            showErrorAlert(isSuccesfull);
          }
        }
      } catch (error) {
        showErrorAlert("transactionError");
      } finally {
        setLoading(false);
      }

      return result;
    },
    [inviteCourse, showAlert, showErrorAlert]
  );

  return { handleInviteCourse, loading };
};

export default useInviteCourseHook;
