import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import coursesUtils from "@/utils/fileUtils/coursesFileUtils";
import usersUtils from "@/utils/fileUtils/usersFileUtils";

export async function GET() {
  try {
    const courses = coursesUtils.readData();
    return NextResponse.json(
      {
        message: "Courses found!",
        courses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      {
        message: "Internal server error!",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, instructor, capacity } = await request.json();

    if (!name || !description || !instructor || !capacity) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
        },
        { status: 400 }
      );
    }
    if (typeof capacity !== "number" || capacity <= 0) {
      return NextResponse.json(
        {
          message: "Capacity must be a positive number!",
        },
        { status: 400 }
      );
    }

    const courses: CourseProps[] = coursesUtils.readData();
    const users: UserProps[] = usersUtils.readData();

    const newCourse: CourseProps = {
      id: uuidv4(),
      name,
      description,
      instructor,
      capacity,
      enrolledStudents: [],
    };

    courses.push(newCourse);
    users.forEach((user) => {
      if (user.id === instructor) {
        if (user.courses) user.courses.push(newCourse.id);
        else user.courses = [newCourse.id];
      }
    });

    coursesUtils.writeData(courses);
    usersUtils.writeData(users);

    return NextResponse.json(
      {
        message: "Course created succesfully!",
        courseID: newCourse.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Create course error:", error);
    return NextResponse.json(
      {
        message: "Internal server error!",
      },
      { status: 500 }
    );
  }
}
