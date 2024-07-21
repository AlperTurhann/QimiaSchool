"use client";
import React, { ReactNode, useCallback, useMemo } from "react";
import * as invitationUtils from "@/utils/invitationsUtils";
import {
  InvitationContext,
  InvitationContextType,
} from "@/context/InviteContext";

interface Props {
  children: ReactNode;
}

const InvitationProvider = ({ children }: Props) => {
  const getInvitations = useCallback(invitationUtils.getInvitations, []);
  const getInvitation = useCallback(invitationUtils.getInvitation, []);
  const inviteCourse = useCallback(invitationUtils.inviteCourse, []);
  const acceptInvitation = useCallback(invitationUtils.acceptInvitation, []);
  const declineInvitation = useCallback(invitationUtils.declineInvitation, []);

  const value = useMemo<InvitationContextType>(
    () => ({
      getInvitations,
      getInvitation,
      inviteCourse,
      acceptInvitation,
      declineInvitation,
    }),
    [
      getInvitations,
      getInvitation,
      inviteCourse,
      acceptInvitation,
      declineInvitation,
    ]
  );

  return (
    <InvitationContext.Provider value={value}>
      {children}
    </InvitationContext.Provider>
  );
};

export default InvitationProvider;
