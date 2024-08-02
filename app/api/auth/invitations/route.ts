import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
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
): Promise<NextResponse<SuccessResponse<InvitationProps[]> | APIErrorsKeys>> {
  try {
    const userID = await request.json();

    if (!userID) {
      return missingFieldsResponse;
    }

    const users = usersUtils.readData();
    const user = users.find((userData) => userData.id === userID);

    if (!user) {
      return noContentResponse;
    }

    return NextResponse.json(
      {
        message: "contentFound",
        data: user.invitations,
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
    const { invitingUserID, invitedUserID, invitedCourseID } =
      await request.json();

    if (!invitingUserID || !invitedUserID || !invitedCourseID) {
      return missingFieldsResponse;
    }

    const users = usersUtils.readData();
    const invitingUserIndex = users.findIndex(
      (user) => user.id === invitingUserID
    );

    if (invitingUserIndex === -1) {
      return noContentResponse;
    }

    const invitedUserIndex = users.findIndex(
      (user) => user.id === invitedUserID
    );

    if (invitedUserIndex === -1) {
      return noContentResponse;
    }

    const courses = coursesUtils.readData();
    const invitedCourseIndex = courses.findIndex(
      (course) => course.id === invitedCourseID
    );

    if (invitedCourseIndex === -1) {
      return noContentResponse;
    }

    users[invitedUserIndex].invitations.push({
      invitationID: uuidv4(),
      userID: invitingUserID,
      courseID: invitedCourseID,
    });

    usersUtils.writeData(users);
    coursesUtils.writeData(courses);

    return NextResponse.json(
      {
        message: "inviteCourse",
        data: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return internalResponse;
  }
}
