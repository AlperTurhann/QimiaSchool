import { useState, useEffect, useCallback } from "react";
import { InvitationProps } from "@/types/InvitationTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useInvitationContext } from "@/context/InviteContext";

const useGetInvitationsHook = () => {
  const { showAlert } = useAlertContext();
  const { state } = useUserContext();
  const { getInvitations } = useInvitationContext();
  const [invitations, setInvitations] = useState<InvitationProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInvitations = useCallback(async () => {
    try {
      if (state.user) {
        setLoading(true);
        const fetchedInvitations = await getInvitations(state.user.id);
        if ("data" in fetchedInvitations) {
          if (fetchedInvitations.data) {
            setInvitations(fetchedInvitations.data);
          } else {
            showAlert("Error", fetchedInvitations.message);
          }
        } else {
          showAlert("Error", fetchedInvitations.error);
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
  }, [getInvitations]);

  useEffect(() => {
    if (state.user) fetchInvitations();
  }, [fetchInvitations]);

  return { invitations, setInvitations, loading };
};

export default useGetInvitationsHook;
