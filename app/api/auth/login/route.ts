import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserProps } from "@/types/UserTypes";
import { ErrorResponse, SuccessResponse } from "@/types/ResponseTypes";
import usersUtils from "@/utils/fileUtils/usersFileUtils";

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponse<UserProps> | ErrorResponse>> {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
          error: "Email and password are required",
        },
        { status: 400 }
      );
    }

    const users: UserProps[] = usersUtils.readData();
    const user = users.find((user) => user.email === email);

    if (!user) {
      return NextResponse.json(
        {
          message: "No user found with this email address!",
          error: "No user found with this email address",
        },
        { status: 404 }
      );
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        {
          message: "The password you entered is incorrect!",
          error: "The password you entered is incorrect",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "You are logged in!",
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
