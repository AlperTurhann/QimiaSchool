import { NextResponse } from "next/server";
import { UserProps } from "@/types/UserTypes";
import { ErrorResponse, SuccessResponse } from "@/types/ResponseTypes";
import usersUtils from "@/utils/fileUtils/usersFileUtils";

export async function GET(): Promise<
  NextResponse<SuccessResponse<UserProps[]> | ErrorResponse>
> {
  try {
    const users = usersUtils.readData();
    return NextResponse.json(
      {
        message: "Users found!",
        data: users,
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
