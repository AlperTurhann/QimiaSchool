import { InvitationProps } from "@/types/InvitationTypes";
import { SuccessResponse, ErrorResponse } from "@/types/ResponseTypes";
import { parseJSON } from "@/utils/fileUtils/IFileUtils";

const getInvitations = async (
  userID: string
): Promise<SuccessResponse<InvitationProps[]> | ErrorResponse> => {
  try {
    const response = await fetch("/api/auth/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userID),
    });
    return await parseJSON<InvitationProps[]>(response);
  } catch (error) {
    return {
      message: "An error occurred during getting invitations",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const getInvitation = async (
  userID: string,
  invitationID: string
): Promise<SuccessResponse<InvitationProps> | ErrorResponse> => {
  try {
    const response = await fetch(`/api/auth/invitations/${invitationID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID, invitationID }),
    });
    return await parseJSON<InvitationProps>(response);
  } catch (error) {
    return {
      message: "An error occurred during getting invitation",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const inviteCourse = async (
  invitingUserID: string,
  invitedUserID: string,
  invitedCourseID: string
): Promise<SuccessResponse<boolean> | ErrorResponse> => {
  try {
    const response = await fetch("/api/auth/invitations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invitingUserID, invitedUserID, invitedCourseID }),
    });
    return await parseJSON<boolean>(response);
  } catch (error) {
    return {
      message: "An error occurred while inviting to the course",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const acceptCourseInvitation = async (
  currentUserID: string,
  invitation: InvitationProps
): Promise<SuccessResponse<boolean> | ErrorResponse> => {
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
    return {
      message: "An error occurred while accepting to the invitation",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const declineCourseInvitation = async (
  currentUserID: string,
  invitation: InvitationProps
): Promise<SuccessResponse<boolean> | ErrorResponse> => {
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
    return {
      message: "An error occurred while declining to the invitation",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const acceptJoinInvitation = async (
  currentUserID: string,
  invitation: InvitationProps
): Promise<SuccessResponse<boolean> | ErrorResponse> => {
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
    return {
      message: "An error occurred while accepting to the invitation",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const declineJoinInvitation = async (
  currentUserID: string,
  invitation: InvitationProps
): Promise<SuccessResponse<boolean> | ErrorResponse> => {
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
    return {
      message: "An error occurred while declining to the invitation",
      error: error instanceof Error ? error.message : String(error),
    };
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
