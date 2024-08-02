import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { SuccessResponse } from "@/types/ResponseTypes";
import { InvitationProps } from "@/types/InvitationTypes";
import coursesUtils from "@/utils/fileUtils/coursesFileUtils";
import usersUtils from "@/utils/fileUtils/usersFileUtils";
import {
  internalResponse,
  missingFieldsResponse,
  noContentResponse,
} from "@/components/shared/apiErrorResponses";

const checkPutParams = (
  userID: string,
  instructorID: string,
  courseID: string,
  isApply: boolean,
  isEnroll: boolean
): NextResponse<APIErrorsKeys> | null => {
  if (isApply) {
    if (
      !userID ||
      !instructorID ||
      !courseID ||
      isApply === null ||
      isEnroll === null
    ) {
      return missingFieldsResponse;
    } else return null;
  } else if (!userID || !courseID || isApply === null || isEnroll === null) {
    return missingFieldsResponse;
  } else return null;
};

const createSuccessPutResponse = (
  isApply: boolean,
  isEnroll: boolean
): NextResponse<SuccessResponse<boolean>> => {
  let message: APISuccessKeys;
  if (isApply) {
    message = isEnroll ? "applyCourse" : "withdrawCourse";
  } else {
    message = isEnroll ? "enrollCourse" : "deenrollCourse";
  }
  return NextResponse.json({ message, data: true }, { status: 200 });
};

const createErrorResponse = (): NextResponse<APIErrorsKeys> => {
  return internalResponse;
};

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponse<UserProps> | APIErrorsKeys>> {
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
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return createErrorResponse();
  }
}

export async function PUT(
  request: Request
): Promise<NextResponse<SuccessResponse<boolean> | APIErrorsKeys>> {
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
      return noContentResponse;
    }

    const courses = coursesUtils.readData();
    const courseIndex = courses.findIndex((course) => course.id === courseID);

    if (courseIndex === -1) {
      return noContentResponse;
    }

    if (isApply) {
      const instructorIndex = users.findIndex(
        (user) => user.id === instructorID
      );
      if (instructorIndex === -1) {
        return noContentResponse;
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
    return createErrorResponse();
  }
}

export async function DELETE(
  request: Request
): Promise<NextResponse<SuccessResponse<boolean> | APIErrorsKeys>> {
  try {
    const userID = await request.json();

    if (!userID) {
      return missingFieldsResponse;
    }

    const users: UserProps[] = usersUtils.readData();
    const userIndex = users.findIndex((user) => user.id === userID);

    if (userIndex === -1) {
      return noContentResponse;
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
        message: "userDelete",
        data: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return createErrorResponse();
  }
}
