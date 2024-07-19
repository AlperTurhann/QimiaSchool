import { NextResponse } from "next/server";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import coursesUtils from "@/utils/fileUtils/coursesFileUtils";
import usersUtils from "@/utils/fileUtils/usersFileUtils";

export async function POST(request: Request) {
  try {
    const courseID = await request.json();

    if (!courseID) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
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
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Course found!",
        course,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get course error:", error);
    return NextResponse.json(
      {
        message: "Internal server error!",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updatedCourseData } = await request.json();
    console.log(updatedCourseData.enrolledStudents);

    if (!id || Object.keys(updatedCourseData).length === 0) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
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
        },
        { status: 400 }
      );
    }

    const removedStudents = courses[courseIndex].enrolledStudents.filter(
      (studentID) => !updatedCourseData.enrolledStudents.includes(studentID)
    );

    if (removedStudents.length > 0) {
      const users: UserProps[] = usersUtils.readData();
      users.forEach((user) => {
        if (removedStudents.includes(user.id)) {
          user.courses = user.courses.filter((courseID) => courseID !== id);
        }
      });
      usersUtils.writeData(users);
    }

    courses[courseIndex] = { ...courses[courseIndex], ...updatedCourseData };
    coursesUtils.writeData(courses);

    return NextResponse.json(
      {
        message: "Course found!",
        course: courses[courseIndex],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get course error:", error);
    return NextResponse.json(
      {
        message: "Internal server error!",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const courseID = await request.json();

    if (!courseID) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
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
        },
        { status: 404 }
      );
    }

    const users: UserProps[] = usersUtils.readData();

    courses.splice(courseIndex, 1);
    users.forEach((user) => {
      if (user.courses.includes(courseID)) {
        user.courses = user.courses.filter((course) => course !== courseID);
      }
    });

    coursesUtils.writeData(courses);
    usersUtils.writeData(users);

    return NextResponse.json(
      {
        message: "Course deleted succesfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete course error:", error);
    return NextResponse.json(
      {
        message: "Internal server error!",
      },
      { status: 500 }
    );
  }
}
