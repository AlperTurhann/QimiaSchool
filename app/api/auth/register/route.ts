import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { SuccessResponse } from "@/types/ResponseTypes";
import { UserProps } from "@/types/UserTypes";
import usersUtils from "@/utils/fileUtils/usersFileUtils";
import {
  internalResponse,
  missingFieldsResponse,
} from "@/components/shared/apiErrorResponses";

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponse<UserProps> | APIErrorsKeys>> {
  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password || role === null) {
      return missingFieldsResponse;
    }

    const users: UserProps[] = usersUtils.readData();
    if (users.find((user) => user.email === email)) {
      return NextResponse.json("alreadyUsedEmail", { status: 400 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser: UserProps = {
      id: uuidv4(),
      name,
      email,
      role,
      password: hashedPassword,
      courses: [],
      appliedCourses: [],
      invitations: [],
    };

    users.push(newUser);
    usersUtils.writeData(users);

    return NextResponse.json(
      {
        message: "signup",
        data: newUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return internalResponse;
  }
}
