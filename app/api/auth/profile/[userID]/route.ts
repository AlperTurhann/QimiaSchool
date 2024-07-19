import { NextResponse } from "next/server";
import usersUtils from "@/utils/fileUtils/usersFileUtils";
import { UserProps } from "@/types/UserTypes";
import { ErrorResponse, SuccessResponse } from "@/types/ResponseTypes";

export async function GET(
  context: any
): Promise<NextResponse<SuccessResponse<UserProps> | ErrorResponse>> {
  try {
    const { params } = context;
    const users = usersUtils.readData();

    const user = users.find((userData) => userData.id === params.userID);

    if (!user) {
      return NextResponse.json(
        {
          message: "No user found with this ID!",
          error: "UserID is required",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User found",
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
