import { LoginProps, SignupProps, UserProps } from "@/types/UserTypes";
import { SuccessResponse } from "@/types/ResponseTypes";
import { parseJSON } from "@/utils/fileUtils/IFileUtils";

const getUsers = async (): Promise<
  SuccessResponse<UserProps[]> | APIErrorsKeys
> => {
  try {
    const response = await fetch("/api/auth/users");
    return await parseJSON<UserProps[]>(response);
  } catch (error) {
    return "transactionError";
  }
};

const getUser = async (
  userID: string
): Promise<SuccessResponse<UserProps> | APIErrorsKeys> => {
  try {
    const response = await fetch(`/api/auth/users/${userID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userID),
    });
    return await parseJSON<UserProps>(response);
  } catch (error) {
    return "transactionError";
  }
};

const login = async (
  data: LoginProps
): Promise<SuccessResponse<UserProps> | APIErrorsKeys> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await parseJSON<UserProps>(response);
  } catch (error) {
    return "transactionError";
  }
};

const logout = (): SuccessResponse<boolean> | APIErrorsKeys => {
  return {
    message: "logout",
    data: true,
  };
};

const signup = async (
  data: SignupProps
): Promise<SuccessResponse<UserProps> | APIErrorsKeys> => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await parseJSON<UserProps>(response);
  } catch (error) {
    return "transactionError";
  }
};

const enrollCourse = async (
  userID: string,
  courseID: string
): Promise<SuccessResponse<boolean> | APIErrorsKeys> => {
  try {
    const response = await fetch(`/api/auth/users/${userID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID,
        courseID,
        isApply: false,
        isEnroll: true,
      }),
    });
    return await parseJSON<boolean>(response);
  } catch (error) {
    return "transactionError";
  }
};

const leaveCourse = async (
  userID: string,
  courseID: string
): Promise<SuccessResponse<boolean> | APIErrorsKeys> => {
  try {
    const response = await fetch(`/api/auth/users/${userID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID,
        courseID,
        isApply: false,
        isEnroll: false,
      }),
    });
    return await parseJSON<boolean>(response);
  } catch (error) {
    return "transactionError";
  }
};

const applyCourse = async (
  userID: string,
  instructorID: string,
  courseID: string
): Promise<SuccessResponse<boolean> | APIErrorsKeys> => {
  try {
    const response = await fetch(`/api/auth/users/${userID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID,
        instructorID,
        courseID,
        isApply: true,
        isEnroll: true,
      }),
    });
    return await parseJSON<boolean>(response);
  } catch (error) {
    return "transactionError";
  }
};

const withdrawCourse = async (
  userID: string,
  instructorID: string,
  courseID: string
): Promise<SuccessResponse<boolean> | APIErrorsKeys> => {
  try {
    const response = await fetch(`/api/auth/users/${userID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID,
        instructorID,
        courseID,
        isApply: true,
        isEnroll: false,
      }),
    });
    return await parseJSON<boolean>(response);
  } catch (error) {
    return "transactionError";
  }
};

export {
  getUsers,
  getUser,
  login,
  logout,
  signup,
  enrollCourse,
  leaveCourse,
  applyCourse,
  withdrawCourse,
};
