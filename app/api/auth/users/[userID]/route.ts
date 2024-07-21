import { NextResponse } from "next/server";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { ErrorResponse, SuccessResponse } from "@/types/ResponseTypes";
import coursesUtils from "@/utils/fileUtils/coursesFileUtils";
import usersUtils from "@/utils/fileUtils/usersFileUtils";

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
    const { userID, courseID, isEnroll } = await request.json();

    if (!userID || !courseID) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error: "UserID and courseID are required",
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

    if (!isEnroll) {
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

    if (isEnroll) {
      return NextResponse.json(
        {
          message: "Successfully enrolled in the course!",
          data: true,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Successfully de-enrolled from the course!",
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
    return NextResponse.json(
      {
        message: "Internal server error!",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
