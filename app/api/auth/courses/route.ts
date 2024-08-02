import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { SuccessResponse } from "@/types/ResponseTypes";
import coursesUtils from "@/utils/fileUtils/coursesFileUtils";
import usersUtils from "@/utils/fileUtils/usersFileUtils";
import {
  internalResponse,
  missingFieldsResponse,
} from "@/components/shared/apiErrorResponses";

export async function GET(): Promise<
  NextResponse<SuccessResponse<CourseProps[]> | APIErrorsKeys>
> {
  try {
    const courses = coursesUtils.readData();
    return NextResponse.json(
      {
        message: "contentFound",
        data: courses,
      },
      { status: 200 }
    );
  } catch (error) {
    return internalResponse;
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponse<string> | APIErrorsKeys>> {
  try {
    const { name, description, instructor, capacity, accessLevel } =
      await request.json();

    if (
      !name ||
      !description ||
      !instructor ||
      !capacity ||
      accessLevel === null
    ) {
      return missingFieldsResponse;
    }
    if (typeof capacity !== "number" || capacity <= 0) {
      return NextResponse.json("coursePositiveCapacityError", { status: 400 });
    }

    const courses: CourseProps[] = coursesUtils.readData();
    const users: UserProps[] = usersUtils.readData();

    const newCourse: CourseProps = {
      id: uuidv4(),
      name,
      description,
      instructor,
      capacity,
      accessLevel,
      enrolledStudents: [],
      appliedStudents: [],
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
        message: "courseCreate",
        data: newCourse.id,
      },
      { status: 200 }
    );
  } catch (error) {
    return internalResponse;
  }
}
