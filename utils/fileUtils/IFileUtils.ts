import { SuccessResponse } from "@/types/ResponseTypes";

interface IFileUtils<T> {
  readData: () => T[];
  writeData: (data: T[]) => void;
}

const parseJSON = async <T>(
  response: Response
): Promise<SuccessResponse<T> | APIErrorsKeys> => {
  try {
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (response.ok) {
      return {
        message: data.message,
        data: data.data as T,
      };
    } else {
      return data;
    }
  } catch (error) {
    return "failedParseResponse";
  }
};

export type { IFileUtils };
export { parseJSON };
