import { NextResponse } from "next/server";
import usersUtils from "@/utils/fileUtils/usersFileUtils";

export async function GET() {
  try {
    const users = usersUtils.readData();
    return NextResponse.json(
      {
        message: "Users found!",
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      {
        message: "Internal server error!",
      },
      { status: 500 }
    );
  }
}
