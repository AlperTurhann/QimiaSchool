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

const acceptInvitation = async (
  userID: string,
  invitationID: string,
  courseID: string
): Promise<SuccessResponse<boolean> | ErrorResponse> => {
  try {
    const response = await fetch(`/api/auth/invitations/${invitationID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID,
        invitationID,
        courseID,
        isAccepted: true,
      }),
    });
    return await parseJSON<boolean>(response);
  } catch (error) {
    return {
      message: "An error occurred while accepting to the invitation",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const declineInvitation = async (
  userID: string,
  invitationID: string
): Promise<SuccessResponse<boolean> | ErrorResponse> => {
  try {
    const response = await fetch(`/api/auth/invitations/${invitationID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID,
        invitationID,
        isAccepted: false,
      }),
    });
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
  acceptInvitation,
  declineInvitation,
};
