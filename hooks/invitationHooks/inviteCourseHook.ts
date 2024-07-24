import { useCallback, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useInvitationContext } from "@/context/InviteContext";

const useInviteCourseHook = () => {
  const { showAlert } = useAlertContext();
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
          if ("data" in isSuccesfull) {
            if (isSuccesfull.data) {
              showAlert("Success", isSuccesfull.message);
              result = isSuccesfull.data;
            } else {
              showAlert("Error", isSuccesfull.message);
            }
          } else {
            showAlert("Error", isSuccesfull.error);
          }
        }
      } catch (error) {
        showAlert(
          "Error",
          error instanceof Error ? error.message : String(error)
        );
      } finally {
        setLoading(false);
      }

      return result;
    },
    [inviteCourse, showAlert]
  );

  return { handleInviteCourse, loading };
};

export default useInviteCourseHook;
