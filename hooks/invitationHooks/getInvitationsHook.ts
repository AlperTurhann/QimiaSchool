"use client";
import { useState, useEffect, useCallback } from "react";
import { InvitationProps } from "@/types/InvitationTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useInvitationContext } from "@/context/InviteContext";

const useGetInvitationsHook = () => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { state } = useUserContext();
  const { getInvitations } = useInvitationContext();
  const [invitations, setInvitations] = useState<InvitationProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInvitations = useCallback(async () => {
    try {
      if (state.user) {
        setLoading(true);
        const fetchedInvitations = await getInvitations(state.user.id);
        if (typeof fetchedInvitations !== "string") {
          if (fetchedInvitations.data) {
            setInvitations(fetchedInvitations.data);
          } else {
            showAlert(fetchedInvitations.message);
          }
        } else {
          showErrorAlert(fetchedInvitations);
        }
      }
    } catch (error) {
      showErrorAlert("transactionError");
    } finally {
      setLoading(false);
    }
  }, [getInvitations, showAlert, showErrorAlert]);

  useEffect(() => {
    if (state.user) fetchInvitations();
  }, [state.user, fetchInvitations]);

  return { invitations, setInvitations, loading };
};

export default useGetInvitationsHook;
