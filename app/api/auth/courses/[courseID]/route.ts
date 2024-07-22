import { NextResponse } from "next/server";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { ErrorResponse, SuccessResponse } from "@/types/ResponseTypes";
import coursesUtils from "@/utils/fileUtils/coursesFileUtils";
import usersUtils from "@/utils/fileUtils/usersFileUtils";

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponse<CourseProps> | ErrorResponse>> {
  try {
    const courseID = await request.json();

    if (!courseID) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error: "CourseID is required",
        },
        { status: 400 }
      );
    }

    const courses = coursesUtils.readData();
    const course = courses.find((courseData) => courseData.id === courseID);

    if (!course) {
      return NextResponse.json(
        {
          message: "No course found with this ID!",
          error: "Course not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Course found!",
        data: course,
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
): Promise<NextResponse<SuccessResponse<CourseProps> | ErrorResponse>> {
  try {
    const { id, currentUserID, ...updatedCourseData } = await request.json();

    if (!id || !currentUserID || Object.keys(updatedCourseData).length === 0) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error: "ID, currentUserID and updated data are required",
        },
        { status: 400 }
      );
    }

    const courses = coursesUtils.readData();
    const courseIndex = courses.findIndex((course) => course.id === id);

    if (courseIndex === -1) {
      return NextResponse.json(
        {
          message: "No course found with this ID!",
          error: "No course found with this ID",
        },
        { status: 404 }
      );
    }

    if (
      updatedCourseData.capacity < updatedCourseData.enrolledStudents.length
    ) {
      return NextResponse.json(
        {
          message:
            "New capacity cannot be less than the number of enrolled students!",
          error:
            "New capacity cannot be less than the number of enrolled students",
        },
        { status: 400 }
      );
    }

    const enrolledStudents = updatedCourseData.enrolledStudents.filter(
      (studentID: string) =>
        !courses[courseIndex].enrolledStudents.includes(studentID)
    );
    const removedStudents = courses[courseIndex].enrolledStudents.filter(
      (studentID) => !updatedCourseData.enrolledStudents.includes(studentID)
    );
    const respondedStudents = courses[courseIndex].appliedStudents.filter(
      (studentID) => !updatedCourseData.appliedStudents.includes(studentID)
    );

    if (
      enrolledStudents.length +
        removedStudents.length +
        respondedStudents.length >
      0
    ) {
      const users = usersUtils.readData();

      if (enrolledStudents.length > 0) {
        users.forEach((user) => {
          if (enrolledStudents.includes(user.id)) {
            user.courses.push(id);
          }
        });
      }
      if (removedStudents.length > 0) {
        users.forEach((user) => {
          if (removedStudents.includes(user.id)) {
            user.courses = user.courses.filter((courseID) => courseID !== id);
          }
        });
      }
      if (respondedStudents.length > 0) {
        const currentUserIndex = users.findIndex(
          (user) => user.id === currentUserID
        );
        if (currentUserIndex === -1) {
          return NextResponse.json(
            {
              message: "No user found with this ID!",
              error: "No user found with this ID",
            },
            { status: 404 }
          );
        }

        users.forEach((user) => {
          if (respondedStudents.includes(user.id)) {
            user.appliedCourses = user.appliedCourses.filter(
              (courseID) => courseID !== id
            );

            users[currentUserIndex].invitations = users[
              currentUserIndex
            ].invitations.filter(
              (inv) => !(inv.userID === user.id && inv.courseID === id)
            );
          }
        });
      }

      usersUtils.writeData(users);
    }

    courses[courseIndex] = { ...courses[courseIndex], ...updatedCourseData };
    coursesUtils.writeData(courses);

    return NextResponse.json(
      {
        message: "Course updated successfully!",
        data: courses[courseIndex],
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

export async function DELETE(
  request: Request
): Promise<NextResponse<SuccessResponse<boolean> | ErrorResponse>> {
  try {
    const courseID = await request.json();

    if (!courseID) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error: "CourseID is required",
        },
        { status: 400 }
      );
    }

    const courses: CourseProps[] = coursesUtils.readData();
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

    const users: UserProps[] = usersUtils.readData();

    courses.splice(courseIndex, 1);
    users.forEach((user) => {
      user.courses = user.courses.filter((course) => course !== courseID);
      user.invitations = user.invitations.filter(
        (invitation) => invitation.courseID !== courseID
      );
    });

    coursesUtils.writeData(courses);
    usersUtils.writeData(users);

    return NextResponse.json(
      {
        message: "Course deleted succesfully!",
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
