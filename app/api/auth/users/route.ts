import { NextResponse } from "next/server";
import { UserProps } from "@/types/UserTypes";
import { SuccessResponse } from "@/types/ResponseTypes";
import usersUtils from "@/utils/fileUtils/usersFileUtils";
import { internalResponse } from "@/components/shared/apiErrorResponses";

export async function GET(): Promise<
  NextResponse<SuccessResponse<UserProps[]> | APIErrorsKeys>
> {
  try {
    const users = usersUtils.readData();
    return NextResponse.json(
      {
        message: "contentFound",
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return internalResponse;
  }
}
