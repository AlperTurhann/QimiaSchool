import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { InvitationProps } from "@/types/InvitationTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useInvitationContext } from "@/context/InviteContext";

const useDeclineJoinInvitationHook = (
  setInvitations: Dispatch<SetStateAction<InvitationProps[]>>
) => {
  const { showAlert } = useAlertContext();
  const { state, dispatch } = useUserContext();
  const { declineJoinInvitation } = useInvitationContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeclineJoinInvitation = useCallback(
    async (invitation: InvitationProps) => {
      try {
        if (state.user) {
          setLoading(true);
          const isSuccesfull = await declineJoinInvitation(
            state.user.id,
            invitation
          );
          if ("data" in isSuccesfull) {
            if (isSuccesfull.data) {
              setInvitations((prevInvitations) =>
                prevInvitations.filter(
                  (prevInvitation) =>
                    invitation.invitationID !== prevInvitation.invitationID
                )
              );
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
    [declineJoinInvitation, showAlert]
  );

  return { handleDeclineJoinInvitation, loading };
};

export default useDeclineJoinInvitationHook;
