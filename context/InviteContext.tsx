import { createContext, useContext } from "react";
import * as invitationUtils from "@/utils/invitationsUtils";

type InvitationContextType = {
  getInvitations: typeof invitationUtils.getInvitations;
  getInvitation: typeof invitationUtils.getInvitation;
  inviteCourse: typeof invitationUtils.inviteCourse;
  acceptInvitation: typeof invitationUtils.acceptInvitation;
  declineInvitation: typeof invitationUtils.declineInvitation;
};

const InvitationContext = createContext<InvitationContextType | undefined>(
  undefined
);

const useInvitationContext = () => {
  const context = useContext(InvitationContext);
  if (context === undefined) {
    throw new Error(
      "useInvitationContext must be used within a InvitationProvider"
    );
  }
  return context;
};

export { InvitationContext, useInvitationContext };
export type { InvitationContextType };
