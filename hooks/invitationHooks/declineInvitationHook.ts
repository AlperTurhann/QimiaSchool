import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { InvitationProps } from "@/types/InvitationTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useInvitationContext } from "@/context/InviteContext";
const useDeclineInvitationHook = (
  setInvitations?: Dispatch<SetStateAction<InvitationProps[]>>
) => {
  const { showAlert } = useAlertContext();
  const { state, dispatch } = useUserContext();
  const { declineInvitation } = useInvitationContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeclineInvitation = useCallback(
    async (invitationID: string) => {
      try {
        if (state.user) {
          setLoading(true);
          const isSuccesfull = await declineInvitation(
            state.user.id,
            invitationID
          );
          if ("data" in isSuccesfull) {
            if (isSuccesfull.data) {
              if (setInvitations) {
                setInvitations((prevInvitations) =>
                  prevInvitations.filter(
                    (prevInvitation) =>
                      invitationID !== prevInvitation.invitationID
                  )
                );
              }
              dispatch({
                type: "DECLINE_COURSE_INVITATION",
                payload: invitationID,
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
    [declineInvitation, state.user]
  );

  return { handleDeclineInvitation, loading };
};

export default useDeclineInvitationHook;
