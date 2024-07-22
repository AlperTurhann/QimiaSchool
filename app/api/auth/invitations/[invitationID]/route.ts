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

    const invitation = user.invitations.find(
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
    const { currentUserID, invitation, isAccepted, isJoin } =
      await request.json();

    if (
      !currentUserID ||
      !invitation ||
      isAccepted === null ||
      isJoin === null
    ) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error:
            "CurrentUserID, invitation, isAccepted and isJoin are required",
        },
        { status: 400 }
      );
    }

    const users = usersUtils.readData();
    const currentUserIndex = users.findIndex(
      (user) => user.id === currentUserID
    );
    if (currentUserIndex === -1) {
      return NextResponse.json(
        {
          message: "No user found with this ID! (currentUser)",
          error: "No user found with this ID (currentUser)",
        },
        { status: 404 }
      );
    }

    const userIndex = users.findIndex((user) => user.id === invitation.userID);
    if (userIndex === -1) {
      return NextResponse.json(
        {
          message: "No user found with this ID!",
          error: "No user found with this ID",
        },
        { status: 404 }
      );
    }
    const invitationIndex = users[currentUserIndex].invitations.findIndex(
      (inv) => inv.invitationID === invitation.invitationID
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

    const courses = coursesUtils.readData();
    const courseIndex = courses.findIndex(
      (course) => course.id === invitation.courseID
    );
    if (courseIndex === -1) {
      return NextResponse.json(
        {
          message: "No course found with this ID!",
          error: "No course found with this ID",
        },
        { status: 404 }
      );
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
          message: "Successfully accepted the invitation!",
          data: true,
        },
        { status: 200 }
      );
    }
    usersUtils.writeData(users);
    coursesUtils.writeData(courses);

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
