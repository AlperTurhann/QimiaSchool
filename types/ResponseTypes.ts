type SuccessResponse<T> = {
  message: APISuccessKeys;
  data: T | null;
};

export type { SuccessResponse };
