"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { InvitationProps } from "@/types/InvitationTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useInvitationContext } from "@/context/InviteContext";

const useDeclineCourseInvitationHook = (
  setInvitations?: Dispatch<SetStateAction<InvitationProps[]>>
) => {
  const { showAlert, showErrorAlert } = useAlertContext();
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
          if (typeof isSuccesfull !== "string") {
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
    [declineCourseInvitation, showAlert, showErrorAlert]
  );

  return { handleDeclineCourseInvitation, loading };
};

export default useDeclineCourseInvitationHook;
