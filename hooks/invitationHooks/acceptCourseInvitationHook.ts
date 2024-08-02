"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { InvitationProps } from "@/types/InvitationTypes";
import { UserProps } from "@/types/UserTypes";
import { SuccessResponse } from "@/types/ResponseTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useInvitationContext } from "@/context/InviteContext";

const useAcceptCourseInvitationHook = (
  setInvitations?: Dispatch<SetStateAction<InvitationProps[]>>,
  setEnrolledUsers?: Dispatch<SetStateAction<UserProps[]>>
) => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { state, dispatch } = useUserContext();
  const { acceptCourseInvitation } = useInvitationContext();
  const [loading, setLoading] = useState<boolean>(false);

  const updateInvitations = (invitation: InvitationProps) => {
    if (setInvitations) {
      setInvitations((prevInvitations) =>
        prevInvitations.filter(
          (prevInvitation) =>
            invitation.invitationID !== prevInvitation.invitationID
        )
      );
    }
  };

  const updateEnrolledUsers = () => {
    if (setEnrolledUsers && state.user) {
      setEnrolledUsers((prevEnrolledUsers) => [
        ...prevEnrolledUsers,
        state.user as UserProps,
      ]);
    }
  };

  const handleAcceptCourseInvitationResult = (
    result: SuccessResponse<boolean> | APIErrorsKeys,
    invitation: InvitationProps
  ) => {
    if (typeof result !== "string") {
      if (result.data) {
        updateInvitations(invitation);
        updateEnrolledUsers();
        dispatch({
          type: "ACCEPT_COURSE_INVITATION",
          payload: invitation,
        });
        showAlert(result.message);
      } else {
        showAlert(result.message);
      }
    } else {
      showErrorAlert(result);
    }
  };

  const handleAcceptCourseInvitation = useCallback(
    async (invitation: InvitationProps) => {
      if (!state.user) return;

      setLoading(true);
      try {
        const result = await acceptCourseInvitation(state.user.id, invitation);
        handleAcceptCourseInvitationResult(result, invitation);
      } catch (error) {
        showErrorAlert("transactionError");
      } finally {
        setLoading(false);
      }
    },
    [acceptCourseInvitation, showErrorAlert]
  );

  return { handleAcceptCourseInvitation, loading };
};

export default useAcceptCourseInvitationHook;
