import { NextResponse } from "next/server";
import { SuccessResponse } from "@/types/ResponseTypes";
import { InvitationProps } from "@/types/InvitationTypes";
import usersUtils from "@/utils/fileUtils/usersFileUtils";
import coursesUtils from "@/utils/fileUtils/coursesFileUtils";
import {
  internalResponse,
  missingFieldsResponse,
  noContentResponse,
} from "@/components/shared/apiErrorResponses";

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponse<InvitationProps> | APIErrorsKeys>> {
  try {
    const { userID, invitationID } = await request.json();

    if (!userID || !invitationID) {
      return missingFieldsResponse;
    }

    const users = usersUtils.readData();
    const user = users.find((userData) => userData.id === userID);

    if (!user) {
      return noContentResponse;
    }

    const invitation = user.invitations.find(
      (inv) => inv.invitationID === invitationID
    );

    if (!invitation) {
      return noContentResponse;
    }

    return NextResponse.json(
      {
        message: "contentFound",
        data: invitation,
      },
      { status: 200 }
    );
  } catch (error) {
    return internalResponse;
  }
}

export async function PUT(
  request: Request
): Promise<NextResponse<SuccessResponse<boolean> | APIErrorsKeys>> {
  try {
    const { currentUserID, invitation, isAccepted, isJoin } =
      await request.json();

    if (
      !currentUserID ||
      !invitation ||
      isAccepted === null ||
      isJoin === null
    ) {
      return missingFieldsResponse;
    }

    const users = usersUtils.readData();
    const currentUserIndex = users.findIndex(
      (user) => user.id === currentUserID
    );
    if (currentUserIndex === -1) {
      return noContentResponse;
    }

    const userIndex = users.findIndex((user) => user.id === invitation.userID);
    if (userIndex === -1) {
      return noContentResponse;
    }
    const invitationIndex = users[currentUserIndex].invitations.findIndex(
      (inv) => inv.invitationID === invitation.invitationID
    );
    if (invitationIndex === -1) {
      return noContentResponse;
    }

    const courses = coursesUtils.readData();
    const courseIndex = courses.findIndex(
      (course) => course.id === invitation.courseID
    );
    if (courseIndex === -1) {
      return noContentResponse;
    }

    users[currentUserIndex].invitations.splice(invitationIndex, 1);
    if (isJoin) {
      users[userIndex].appliedCourses = users[userIndex].appliedCourses.filter(
        (course) => course !== invitation.courseID
      );
      courses[courseIndex].appliedStudents = courses[
        courseIndex
      ].appliedStudents.filter((studentID) => studentID !== invitation.userID);
    }
    if (isAccepted) {
      if (isJoin) {
        users[userIndex].courses.push(invitation.courseID);
        courses[courseIndex].enrolledStudents.push(invitation.userID);
      } else {
        users[currentUserIndex].courses.push(invitation.courseID);
        courses[courseIndex].enrolledStudents.push(currentUserID);
      }

      usersUtils.writeData(users);
      coursesUtils.writeData(courses);

      return NextResponse.json(
        {
          message: "acceptInvitation",
          data: true,
        },
        { status: 200 }
      );
    }
    usersUtils.writeData(users);
    coursesUtils.writeData(courses);

    return NextResponse.json(
      {
        message: "declineInvitation",
        data: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return internalResponse;
  }
}
