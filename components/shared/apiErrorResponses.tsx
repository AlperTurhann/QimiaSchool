import { NextResponse } from "next/server";

const missingFieldsResponse: NextResponse<"missingFieldsError"> =
  NextResponse.json("missingFieldsError", {
    status: 400,
  });
const noContentResponse: NextResponse<"noContentError"> = NextResponse.json(
  "noContentError",
  {
    status: 404,
  }
);
const internalResponse: NextResponse<"internalError"> = NextResponse.json(
  "internalError",
  {
    status: 500,
  }
);

export { missingFieldsResponse, noContentResponse, internalResponse };
