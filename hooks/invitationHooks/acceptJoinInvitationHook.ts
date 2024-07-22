import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { InvitationProps } from "@/types/InvitationTypes";
import { ErrorResponse, SuccessResponse } from "@/types/ResponseTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useInvitationContext } from "@/context/InviteContext";

const useAcceptJoinInvitationHook = (
  setInvitations: Dispatch<SetStateAction<InvitationProps[]>>
) => {
  const { showAlert } = useAlertContext();
  const { state, dispatch } = useUserContext();
  const { acceptJoinInvitation } = useInvitationContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAcceptJoinInvitationResult = (
    result: SuccessResponse<boolean> | ErrorResponse,
    invitation: InvitationProps
  ) => {
    if ("data" in result) {
      if (result.data) {
        setInvitations((prevInvitations) =>
          prevInvitations.filter(
            (prevInvitation) =>
              invitation.invitationID !== prevInvitation.invitationID
          )
        );
        dispatch({
          type: "ACCEPT_JOIN_INVITATION",
          payload: invitation.invitationID,
        });
        showAlert("Success", result.message);
      } else {
        showAlert("Error", result.message);
      }
    } else {
      showAlert("Error", result.error);
    }
  };

  const handleAcceptJoinInvitation = useCallback(
    async (invitation: InvitationProps) => {
      if (!state.user) return;

      setLoading(true);
      try {
        const result = await acceptJoinInvitation(state.user.id, invitation);
        handleAcceptJoinInvitationResult(result, invitation);
      } catch (error) {
        showAlert(
          "Error",
          error instanceof Error ? error.message : String(error)
        );
      } finally {
        setLoading(false);
      }
    },
    [acceptJoinInvitation, state.user]
  );

  return { handleAcceptJoinInvitation, loading };
};

export default useAcceptJoinInvitationHook;
