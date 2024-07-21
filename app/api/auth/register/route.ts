import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { UserProps } from "@/types/UserTypes";
import usersUtils from "@/utils/fileUtils/usersFileUtils";
import { ErrorResponse, SuccessResponse } from "@/types/ResponseTypes";

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponse<UserProps> | ErrorResponse>> {
  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error: "Name, email, password and role are required",
        },
        { status: 400 }
      );
    }

    const users: UserProps[] = usersUtils.readData();
    if (users.find((user) => user.email === email)) {
      return NextResponse.json(
        {
          message: "An account is already registered with this email address!",
          error: "An account is already registered with this email address",
        },
        { status: 400 }
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser: UserProps = {
      id: uuidv4(),
      name,
      email,
      courses: [],
      role,
      password: hashedPassword,
      courseInvitations: [],
    };

    users.push(newUser);
    usersUtils.writeData(users);

    return NextResponse.json(
      {
        message: "You registered succesfully!",
        data: newUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      {
        message: "Internal server error!",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
