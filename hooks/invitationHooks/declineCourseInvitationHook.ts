import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { InvitationProps } from "@/types/InvitationTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useInvitationContext } from "@/context/InviteContext";

const useDeclineCourseInvitationHook = (
  setInvitations?: Dispatch<SetStateAction<InvitationProps[]>>
) => {
  const { showAlert } = useAlertContext();
  const { state, dispatch } = useUserContext();
  const { declineCourseInvitation } = useInvitationContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeclineCourseInvitation = useCallback(
    async (invitation: InvitationProps) => {
      try {
        if (state.user) {
          setLoading(true);
          const isSuccesfull = await declineCourseInvitation(
            state.user.id,
            invitation
          );
          if ("data" in isSuccesfull) {
            if (isSuccesfull.data) {
              if (setInvitations) {
                setInvitations((prevInvitations) =>
                  prevInvitations.filter(
                    (prevInvitation) =>
                      invitation.invitationID !== prevInvitation.invitationID
                  )
                );
              }
              dispatch({
                type: "DECLINE_COURSE_INVITATION",
                payload: invitation.invitationID,
              });
              showAlert("Success", isSuccesfull.message);
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
    },
    [declineCourseInvitation, state.user]
  );

  return { handleDeclineCourseInvitation, loading };
};

export default useDeclineCourseInvitationHook;
