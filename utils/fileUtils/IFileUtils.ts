import { SuccessResponse, ErrorResponse } from "@/types/ResponseTypes";

interface IFileUtils<T> {
  readData: () => T[];
  writeData: (data: T[]) => void;
}

const parseJSON = async <T>(
  response: Response
): Promise<SuccessResponse<T> | ErrorResponse> => {
  try {
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (response.ok) {
      return {
        message: data.message || "Success",
        data: data.data as T,
      };
    } else {
      return {
        message: data.message || "An error occurred",
        error: data.error || "Unknown error",
      };
    }
  } catch (error) {
    return {
      message: "Failed to parse response",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export type { IFileUtils };
export { parseJSON };
