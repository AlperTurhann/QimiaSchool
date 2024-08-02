import { InvitationProps } from "@/types/InvitationTypes";
import { SuccessResponse } from "@/types/ResponseTypes";
import { parseJSON } from "@/utils/fileUtils/IFileUtils";

const getInvitations = async (
  userID: string
): Promise<SuccessResponse<InvitationProps[]> | APIErrorsKeys> => {
  try {
    const response = await fetch("/api/auth/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userID),
    });
    return await parseJSON<InvitationProps[]>(response);
  } catch (error) {
    return "transactionError";
  }
};

const getInvitation = async (
  userID: string,
  invitationID: string
): Promise<SuccessResponse<InvitationProps> | APIErrorsKeys> => {
  try {
    const response = await fetch(`/api/auth/invitations/${invitationID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID, invitationID }),
    });
    return await parseJSON<InvitationProps>(response);
  } catch (error) {
    return "transactionError";
  }
};

const inviteCourse = async (
  invitingUserID: string,
  invitedUserID: string,
  invitedCourseID: string
): Promise<SuccessResponse<boolean> | APIErrorsKeys> => {
  try {
    const response = await fetch("/api/auth/invitations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invitingUserID, invitedUserID, invitedCourseID }),
    });
    return await parseJSON<boolean>(response);
  } catch (error) {
    return "transactionError";
  }
};

const acceptCourseInvitation = async (
  currentUserID: string,
  invitation: InvitationProps
): Promise<SuccessResponse<boolean> | APIErrorsKeys> => {
  try {
    const response = await fetch(
      `/api/auth/invitations/${invitation.invitationID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUserID,
          invitation,
          isAccepted: true,
          isJoin: false,
        }),
      }
    );
    return await parseJSON<boolean>(response);
  } catch (error) {
    return "transactionError";
  }
};

const declineCourseInvitation = async (
  currentUserID: string,
  invitation: InvitationProps
): Promise<SuccessResponse<boolean> | APIErrorsKeys> => {
  try {
    const response = await fetch(
      `/api/auth/invitations/${invitation.invitationID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUserID,
          invitation,
          isAccepted: false,
          isJoin: false,
        }),
      }
    );
    return await parseJSON<boolean>(response);
  } catch (error) {
    return "transactionError";
  }
};

const acceptJoinInvitation = async (
  currentUserID: string,
  invitation: InvitationProps
): Promise<SuccessResponse<boolean> | APIErrorsKeys> => {
  try {
    const response = await fetch(
      `/api/auth/invitations/${invitation.invitationID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUserID,
          invitation,
          isAccepted: true,
          isJoin: true,
        }),
      }
    );
    return await parseJSON<boolean>(response);
  } catch (error) {
    return "transactionError";
  }
};

const declineJoinInvitation = async (
  currentUserID: string,
  invitation: InvitationProps
): Promise<SuccessResponse<boolean> | APIErrorsKeys> => {
  try {
    const response = await fetch(
      `/api/auth/invitations/${invitation.invitationID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUserID,
          invitation,
          isAccepted: false,
          isJoin: true,
        }),
      }
    );
    return await parseJSON<boolean>(response);
  } catch (error) {
    return "transactionError";
  }
};

export {
  getInvitations,
  getInvitation,
  inviteCourse,
  acceptCourseInvitation,
  declineCourseInvitation,
  acceptJoinInvitation,
  declineJoinInvitation,
};
