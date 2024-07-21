import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ErrorResponse, SuccessResponse } from "@/types/ResponseTypes";
import { InvitationProps } from "@/types/InvitationTypes";
import usersUtils from "@/utils/fileUtils/usersFileUtils";
import coursesUtils from "@/utils/fileUtils/coursesFileUtils";

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponse<InvitationProps[]> | ErrorResponse>> {
  try {
    const userID = await request.json();

    if (!userID) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error: "UserID is required",
        },
        { status: 400 }
      );
    }

    const users = usersUtils.readData();
    const user = users.find((userData) => userData.id === userID);

    if (!user) {
      return NextResponse.json(
        {
          message: "No user found with this ID!",
          error: "No user found with this ID",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Invitations found!",
        data: user.courseInvitations,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error!",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request
): Promise<NextResponse<SuccessResponse<boolean> | ErrorResponse>> {
  try {
    const { invitingUserID, invitedUserID, invitedCourseID } =
      await request.json();

    if (!invitingUserID || !invitedUserID || !invitedCourseID) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error:
            "InvitingUserID, invitedUserID and invitedCourseID are required",
        },
        { status: 400 }
      );
    }

    const users = usersUtils.readData();
    const invitingUserIndex = users.findIndex(
      (user) => user.id === invitingUserID
    );

    if (invitingUserIndex === -1) {
      return NextResponse.json(
        {
          message: "No user found with this ID! (invitingUserID)",
          error: "No user found with this ID (invitingUserID)",
        },
        { status: 404 }
      );
    }

    const invitedUserIndex = users.findIndex(
      (user) => user.id === invitedUserID
    );

    if (invitedUserIndex === -1) {
      return NextResponse.json(
        {
          message: "No user found with this ID! (invitedUserID)",
          error: "No user found with this ID (invitedUserID)",
        },
        { status: 404 }
      );
    }

    const courses = coursesUtils.readData();
    const invitedCourseIndex = courses.findIndex(
      (course) => course.id === invitedCourseID
    );

    if (invitedCourseIndex === -1) {
      return NextResponse.json(
        {
          message: "No course found with this ID!",
          error: "No course found with this ID",
        },
        { status: 404 }
      );
    }

    users[invitedUserIndex].courseInvitations.push({
      invitationID: uuidv4(),
      invitingUserID: invitingUserID,
      invitedCourseID: invitedCourseID,
    });

    usersUtils.writeData(users);
    coursesUtils.writeData(courses);

    return NextResponse.json(
      {
        message: "Successfully invited from the course!",
        data: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error!",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
