import { NextResponse } from "next/server";
import { ErrorResponse, SuccessResponse } from "@/types/ResponseTypes";
import { InvitationProps } from "@/types/InvitationTypes";
import usersUtils from "@/utils/fileUtils/usersFileUtils";
import coursesUtils from "@/utils/fileUtils/coursesFileUtils";

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponse<InvitationProps> | ErrorResponse>> {
  try {
    const { userID, invitationID } = await request.json();

    if (!userID || !invitationID) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error: "UserID and invitationID are required",
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

    const invitation = user.courseInvitations.find(
      (inv) => inv.invitationID === invitationID
    );

    if (!invitation) {
      return NextResponse.json(
        {
          message: "No invitation found with this ID!",
          error: "No invitation found with this ID",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Invitation found!",
        data: invitation,
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
    const { userID, invitationID, courseID, isAccepted } = await request.json();

    if (isAccepted === null) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error: "IsAccepted is required",
        },
        { status: 400 }
      );
    } else if (isAccepted) {
      if (!userID || !invitationID || !courseID) {
        return NextResponse.json(
          {
            message: "Missing required fields!",
            error: "UserID, invitationID and courseID are required",
          },
          { status: 400 }
        );
      }
    } else if (!userID || !invitationID) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error: "UserID and invitationID are required",
        },
        { status: 400 }
      );
    }

    const users = usersUtils.readData();
    const userIndex = users.findIndex((user) => user.id === userID);

    if (userIndex === -1) {
      return NextResponse.json(
        {
          message: "No user found with this ID!",
          error: "No user found with this ID",
        },
        { status: 404 }
      );
    }

    const invitationIndex = users[userIndex].courseInvitations.findIndex(
      (invitation) => invitation.invitationID === invitationID
    );

    if (invitationIndex === -1) {
      return NextResponse.json(
        {
          message: "No invitation found with this ID!",
          error: "No invitation found with this ID",
        },
        { status: 404 }
      );
    }

    users[userIndex].courseInvitations.splice(invitationIndex, 1);
    if (isAccepted) {
      const courses = coursesUtils.readData();
      const courseIndex = courses.findIndex((course) => course.id === courseID);

      if (courseIndex === -1) {
        return NextResponse.json(
          {
            message: "No course found with this ID!",
            error: "No course found with this ID",
          },
          { status: 404 }
        );
      }

      users[userIndex].courses.push(courseID);
      courses[courseIndex].enrolledStudents.push(userID);

      usersUtils.writeData(users);
      coursesUtils.writeData(courses);

      return NextResponse.json(
        {
          message: "Successfully accepted the invitation!",
          data: true,
        },
        { status: 200 }
      );
    }
    usersUtils.writeData(users);

    return NextResponse.json(
      {
        message: "Successfully declined the invitation!",
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
