"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { InvitationProps } from "@/types/InvitationTypes";
import { SuccessResponse } from "@/types/ResponseTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useInvitationContext } from "@/context/InviteContext";

const useAcceptJoinInvitationHook = (
  setInvitations: Dispatch<SetStateAction<InvitationProps[]>>
) => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { state, dispatch } = useUserContext();
  const { acceptJoinInvitation } = useInvitationContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAcceptJoinInvitationResult = (
    result: SuccessResponse<boolean> | APIErrorsKeys,
    invitation: InvitationProps
  ) => {
    if (typeof result !== "string") {
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
        showAlert(result.message);
      } else {
        showAlert(result.message);
      }
    } else {
      showErrorAlert(result);
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
        showErrorAlert("transactionError");
      } finally {
        setLoading(false);
      }
    },
    [acceptJoinInvitation, showErrorAlert]
  );

  return { handleAcceptJoinInvitation, loading };
};

export default useAcceptJoinInvitationHook;
