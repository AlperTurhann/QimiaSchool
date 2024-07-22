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
  const acceptCourseInvitation = useCallback(
    invitationUtils.acceptCourseInvitation,
    []
  );
  const declineCourseInvitation = useCallback(
    invitationUtils.declineCourseInvitation,
    []
  );
  const acceptJoinInvitation = useCallback(
    invitationUtils.acceptJoinInvitation,
    []
  );
  const declineJoinInvitation = useCallback(
    invitationUtils.declineJoinInvitation,
    []
  );

  const value = useMemo<InvitationContextType>(
    () => ({
      getInvitations,
      getInvitation,
      inviteCourse,
      acceptCourseInvitation,
      declineCourseInvitation,
      acceptJoinInvitation,
      declineJoinInvitation,
    }),
    [
      getInvitations,
      getInvitation,
      inviteCourse,
      acceptCourseInvitation,
      declineCourseInvitation,
      acceptJoinInvitation,
      declineJoinInvitation,
    ]
  );

  return (
    <InvitationContext.Provider value={value}>
      {children}
    </InvitationContext.Provider>
  );
};

export default InvitationProvider;
