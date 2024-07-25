import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { ErrorResponse, SuccessResponse } from "@/types/ResponseTypes";
import { InvitationProps } from "@/types/InvitationTypes";
import coursesUtils from "@/utils/fileUtils/coursesFileUtils";
import usersUtils from "@/utils/fileUtils/usersFileUtils";

const checkPutParams = (
  userID: string,
  instructorID: string,
  courseID: string,
  isApply: boolean,
  isEnroll: boolean
): NextResponse<ErrorResponse> | null => {
  if (isApply) {
    if (
      !userID ||
      !instructorID ||
      !courseID ||
      isApply === null ||
      isEnroll === null
    ) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error: "UserID, instructorID and courseID are required",
        },
        { status: 400 }
      );
    } else return null;
  } else if (!userID || !courseID || isApply === null || isEnroll === null) {
    return NextResponse.json(
      {
        message: "Missing required fields!",
        error: "UserID and courseID are required",
      },
      { status: 400 }
    );
  } else return null;
};

const createSuccessPutResponse = (
  isApply: boolean,
  isEnroll: boolean
): NextResponse<SuccessResponse<boolean>> => {
  let message: string;
  if (isApply) {
    message = isEnroll
      ? "Successfully applied to the course!"
      : "Successfully withdrew from the course!";
  } else {
    message = isEnroll
      ? "Successfully enrolled in the course!"
      : "Successfully de-enrolled from the course!";
  }
  return NextResponse.json({ message, data: true }, { status: 200 });
};

const createErrorResponse = (error: unknown): NextResponse<ErrorResponse> => {
  return NextResponse.json(
    {
      message: "Internal server error!",
      error: error instanceof Error ? error.message : String(error),
    },
    { status: 500 }
  );
};

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponse<UserProps> | ErrorResponse>> {
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
        message: "User found!",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function PUT(
  request: Request
): Promise<NextResponse<SuccessResponse<boolean> | ErrorResponse>> {
  try {
    const { userID, instructorID, courseID, isApply, isEnroll } =
      await request.json();

    const missingField = checkPutParams(
      userID,
      instructorID,
      courseID,
      isApply,
      isEnroll
    );
    if (missingField) return missingField;

    const users = usersUtils.readData();
    const userIndex = users.findIndex((user) => user.id === userID);

    if (userIndex === -1) {
      return NextResponse.json(
        {
          message: "No user found with this ID! (student)",
          error: "No user found with this ID (student)",
        },
        { status: 404 }
      );
    }

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

    if (isApply) {
      const instructorIndex = users.findIndex(
        (user) => user.id === instructorID
      );
      if (instructorIndex === -1) {
        return NextResponse.json(
          {
            message: "No user found with this ID! (instructor)",
            error: "No user found with this ID (instructor)",
          },
          { status: 404 }
        );
      }

      if (!isEnroll) {
        users[userIndex].appliedCourses = users[
          userIndex
        ].appliedCourses.filter((courseId) => courseId !== courseID);
        users[instructorIndex].invitations = users[
          instructorIndex
        ].invitations.filter(
          (invitation) =>
            !(invitation.userID === userID && invitation.courseID === courseID)
        );
        courses[courseIndex].appliedStudents = courses[
          courseIndex
        ].appliedStudents.filter((studentID) => studentID !== userID);
      } else {
        users[userIndex].appliedCourses.push(courseID);
        const joinInvitation: InvitationProps = {
          invitationID: uuidv4(),
          userID: userID,
          courseID: courseID,
        };
        users[instructorIndex].invitations.push(joinInvitation);
        courses[courseIndex].appliedStudents.push(userID);
      }
    } else if (!isEnroll) {
      users[userIndex].courses = users[userIndex].courses.filter(
        (courseId) => courseId !== courseID
      );
      courses[courseIndex].enrolledStudents = courses[
        courseIndex
      ].enrolledStudents.filter((studentID) => studentID !== userID);
    } else {
      users[userIndex].courses.push(courseID);
      courses[courseIndex].enrolledStudents.push(userID);
    }

    usersUtils.writeData(users);
    coursesUtils.writeData(courses);

    return createSuccessPutResponse(isApply, isEnroll);
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function DELETE(
  request: Request
): Promise<NextResponse<SuccessResponse<boolean> | ErrorResponse>> {
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

    const users: UserProps[] = usersUtils.readData();
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

    const courses: CourseProps[] = coursesUtils.readData();

    users.splice(userIndex, 1);
    courses.forEach((course) => {
      if (course.enrolledStudents.includes(userID)) {
        course.enrolledStudents = course.enrolledStudents.filter(
          (user) => user !== userID
        );
      }
    });

    usersUtils.writeData(users);
    coursesUtils.writeData(courses);

    return NextResponse.json(
      {
        message: "User deleted succesfully!",
        data: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return createErrorResponse(error);
  }
}
