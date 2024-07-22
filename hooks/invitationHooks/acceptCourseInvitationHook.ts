import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { InvitationProps } from "@/types/InvitationTypes";
import { UserProps } from "@/types/UserTypes";
import { ErrorResponse, SuccessResponse } from "@/types/ResponseTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useInvitationContext } from "@/context/InviteContext";

const useAcceptCourseInvitationHook = (
  setInvitations?: Dispatch<SetStateAction<InvitationProps[]>>,
  setEnrolledUsers?: Dispatch<SetStateAction<UserProps[]>>
) => {
  const { showAlert } = useAlertContext();
  const { state, dispatch } = useUserContext();
  const { acceptCourseInvitation } = useInvitationContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAcceptCourseInvitationResult = (
    result: SuccessResponse<boolean> | ErrorResponse,
    invitation: InvitationProps
  ) => {
    if ("data" in result) {
      if (result.data) {
        updateInvitations(invitation);
        updateEnrolledUsers();
        dispatch({
          type: "ACCEPT_COURSE_INVITATION",
          payload: invitation,
        });
        showAlert("Success", result.message);
      } else {
        showAlert("Error", result.message);
      }
    } else {
      showAlert("Error", result.error);
    }
  };

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

  const handleAcceptCourseInvitation = useCallback(
    async (invitation: InvitationProps) => {
      if (!state.user) return;

      setLoading(true);
      try {
        const result = await acceptCourseInvitation(state.user.id, invitation);
        handleAcceptCourseInvitationResult(result, invitation);
      } catch (error) {
        showAlert(
          "Error",
          error instanceof Error ? error.message : String(error)
        );
      } finally {
        setLoading(false);
      }
    },
    [acceptCourseInvitation, state.user]
  );

  return { handleAcceptCourseInvitation, loading };
};

export default useAcceptCourseInvitationHook;
