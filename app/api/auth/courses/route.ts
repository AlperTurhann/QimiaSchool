import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { ErrorResponse, SuccessResponse } from "@/types/ResponseTypes";
import coursesUtils from "@/utils/fileUtils/coursesFileUtils";
import usersUtils from "@/utils/fileUtils/usersFileUtils";

export async function GET(): Promise<
  NextResponse<SuccessResponse<CourseProps[]> | ErrorResponse>
> {
  try {
    const courses = coursesUtils.readData();
    return NextResponse.json(
      {
        message: "Courses found!",
        data: courses,
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

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponse<string> | ErrorResponse>> {
  try {
    const { name, description, instructor, capacity } = await request.json();

    if (!name || !description || !instructor || !capacity) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error: "Name, descriptipn, instructor and capacity are required",
        },
        { status: 400 }
      );
    }
    if (typeof capacity !== "number" || capacity <= 0) {
      return NextResponse.json(
        {
          message: "Capacity must be a positive number!",
          error: "Capacity must be a positive number",
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
        data: newCourse.id,
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
