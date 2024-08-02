import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserProps } from "@/types/UserTypes";
import { SuccessResponse } from "@/types/ResponseTypes";
import usersUtils from "@/utils/fileUtils/usersFileUtils";
import {
  internalResponse,
  missingFieldsResponse,
} from "@/components/shared/apiErrorResponses";

export async function POST(
  request: Request
): Promise<NextResponse<SuccessResponse<UserProps> | APIErrorsKeys>> {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return missingFieldsResponse;
    }

    const users: UserProps[] = usersUtils.readData();
    const user = users.find((user) => user.email === email);

    if (!user) {
      return NextResponse.json("wrongEmail", { status: 404 });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json("wrongPassword", { status: 400 });
    }

    return NextResponse.json(
      {
        message: "login",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return internalResponse;
  }
}
