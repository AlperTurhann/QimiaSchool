type SuccessResponse<T> = {
  message: string;
  data: T | null;
};

type ErrorResponse = {
  message: string;
  error: string;
};

export type { SuccessResponse, ErrorResponse };
