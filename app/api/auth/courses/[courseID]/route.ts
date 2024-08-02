import { NextResponse } from "next/server";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { SuccessResponse } from "@/types/ResponseTypes";
import coursesUtils from "@/utils/fileUtils/coursesFileUtils";
import usersUtils from "@/utils/fileUtils/usersFileUtils";
import {
  internalResponse,
  missingFieldsResponse,
  noContentResponse,
} from "@/components/shared/apiErrorResponses";

const getStudentChanges = (
  originalCourse: CourseProps,
  updatedCourseData: CourseProps
) => {
  const enrolledStudents = updatedCourseData.enrolledStudents.filter(
    (studentID: string) => !originalCourse.enrolledStudents.includes(studentID)
  );
  const removedStudents = originalCourse.enrolledStudents.filter(
    (studentID) => !updatedCourseData.enrolledStudents.includes(studentID)
  );
  const respondedStudents = originalCourse.appliedStudents.filter(
    (studentID) => !updatedCourseData.appliedStudents.includes(studentID)
  );

  return { enrolledStudents, removedStudents, respondedStudents };
};

const updateUserData = (
  courseID: string,
  currentUserID: string,
  enrolledStudents: string[],
  removedStudents: string[],
  respondedStudents: string[]
): UserProps[] | APIErrorsKeys => {
  const users = usersUtils.readData();
  const currentUserIndex = users.findIndex((user) => user.id === currentUserID);
  if (currentUserIndex === -1) {
    return "noContentError";
  }

  users.forEach((user) => {
    if (enrolledStudents.includes(user.id)) {
      user.courses.push(courseID);
    }
    if (removedStudents.includes(user.id)) {
      user.courses = user.courses.filter((id) => id !== courseID);
    }
    if (respondedStudents.includes(user.id)) {
      user.appliedCourses = user.appliedCourses.filter((id) => id !== courseID);
      users[currentUserIndex].invitations = users[
        currentUserIndex
      ].invitations.filter(
        (inv) => !(inv.userID === user.id && inv.courseID === courseID)
      );
    }
  });

  return users;
};

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponse<CourseProps> | APIErrorsKeys>> {
  try {
    const courseID = await request.json();

    if (!courseID) return missingFieldsResponse;

    const courses = coursesUtils.readData();
    const course = courses.find((courseData) => courseData.id === courseID);

    if (!course) return noContentResponse;

    return NextResponse.json(
      {
        message: "contentFound",
        data: course,
      },
      { status: 200 }
    );
  } catch {
    return internalResponse;
  }
}

export async function PUT(
  request: Request
): Promise<NextResponse<SuccessResponse<CourseProps> | APIErrorsKeys>> {
  try {
    const { id, currentUserID, ...updatedCourseData } = await request.json();

    if (!id || !currentUserID || Object.keys(updatedCourseData).length === 0) {
      return missingFieldsResponse;
    }

    const courses = coursesUtils.readData();
    const courseIndex = courses.findIndex((course) => course.id === id);

    if (courseIndex === -1) {
      return noContentResponse;
    }

    if (
      updatedCourseData.capacity < updatedCourseData.enrolledStudents.length
    ) {
      return NextResponse.json("notEnoughCourseCapacityError", { status: 400 });
    }

    const { enrolledStudents, removedStudents, respondedStudents } =
      getStudentChanges(courses[courseIndex], updatedCourseData);

    if (
      enrolledStudents.length +
        removedStudents.length +
        respondedStudents.length >
      0
    ) {
      const updatedUsers = updateUserData(
        id,
        currentUserID,
        enrolledStudents,
        removedStudents,
        respondedStudents
      );

      if (typeof updatedUsers === "string")
        return NextResponse.json(updatedUsers);
      usersUtils.writeData(updatedUsers);
    }

    courses[courseIndex] = { ...courses[courseIndex], ...updatedCourseData };
    coursesUtils.writeData(courses);

    return NextResponse.json(
      {
        message: "courseUpdate",
        data: courses[courseIndex],
      },
      { status: 200 }
    );
  } catch (error) {
    return internalResponse;
  }
}

export async function DELETE(
  request: Request
): Promise<NextResponse<SuccessResponse<boolean> | APIErrorsKeys>> {
  try {
    const courseID = await request.json();

    if (!courseID) {
      return missingFieldsResponse;
    }

    const courses: CourseProps[] = coursesUtils.readData();
    const courseIndex = courses.findIndex((course) => course.id === courseID);

    if (courseIndex === -1) {
      return noContentResponse;
    }

    const users: UserProps[] = usersUtils.readData();

    courses.splice(courseIndex, 1);
    users.forEach((user) => {
      user.courses = user.courses.filter((course) => course !== courseID);
      user.invitations = user.invitations.filter(
        (invitation) => invitation.courseID !== courseID
      );
      user.appliedCourses = user.appliedCourses.filter(
        (appliedCourse) => appliedCourse !== courseID
      );
    });

    coursesUtils.writeData(courses);
    usersUtils.writeData(users);

    return NextResponse.json(
      {
        message: "courseDelete",
        data: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return internalResponse;
  }
}
