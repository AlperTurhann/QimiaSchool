import { NextResponse } from "next/server";
import usersUtils from "@/utils/fileUtils/usersFileUtils";

export async function GET(context: any) {
  try {
    const { params } = context;
    const users = usersUtils.readData();

    const user = users.find((userData) => userData.id === params.userID);

    if (!user) {
      return NextResponse.json(
        {
          message: "No user found with this ID!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User found",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      {
        message: "Internal server error!",
      },
      { status: 500 }
    );
  }
}
