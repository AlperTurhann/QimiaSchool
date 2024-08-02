"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { InvitationProps } from "@/types/InvitationTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useInvitationContext } from "@/context/InviteContext";

const useDeclineJoinInvitationHook = (
  setInvitations: Dispatch<SetStateAction<InvitationProps[]>>
) => {
  const { showAlert, showErrorAlert } = useAlertContext();
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
          if (typeof isSuccesfull !== "string") {
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
              showAlert(isSuccesfull.message);
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
    },
    [declineJoinInvitation, showAlert, showErrorAlert]
  );

  return { handleDeclineJoinInvitation, loading };
};

export default useDeclineJoinInvitationHook;
