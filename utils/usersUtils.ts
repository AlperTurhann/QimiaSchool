import { LoginProps, SignupProps, UserProps } from "@/types/UserTypes";
import { SuccessResponse, ErrorResponse } from "@/types/ResponseTypes";
import { parseJSON } from "@/utils/fileUtils/IFileUtils";

const getUsers = async (): Promise<
  SuccessResponse<UserProps[]> | ErrorResponse
> => {
  try {
    const response = await fetch("/api/auth/users");
    return await parseJSON<UserProps[]>(response);
  } catch (error) {
    return {
      message: "An error occurred during getting users",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const getUser = async (
  userID: string
): Promise<SuccessResponse<UserProps> | ErrorResponse> => {
  try {
    const response = await fetch(`/api/auth/users/${userID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userID),
    });
    return await parseJSON<UserProps>(response);
  } catch (error) {
    return {
      message: "An error occurred during getting user",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const login = async (
  data: LoginProps
): Promise<SuccessResponse<UserProps> | ErrorResponse> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await parseJSON<UserProps>(response);
  } catch (error) {
    return {
      message: "An error occurred during login",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const logout = (): SuccessResponse<boolean> | ErrorResponse => {
  return {
    message: "You are logged out!",
    data: true,
  };
};

const signup = async (
  data: SignupProps
): Promise<SuccessResponse<UserProps> | ErrorResponse> => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await parseJSON<UserProps>(response);
  } catch (error) {
    return {
      message: "An error occurred during signup",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const enrollCourse = async (
  userID: string,
  courseID: string
): Promise<SuccessResponse<boolean> | ErrorResponse> => {
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
    return {
      message: "An error occurred during enroll course",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const leaveCourse = async (
  userID: string,
  courseID: string
): Promise<SuccessResponse<boolean> | ErrorResponse> => {
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
    return {
      message: "An error occurred while leaving the course",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const applyCourse = async (
  userID: string,
  instructorID: string,
  courseID: string
): Promise<SuccessResponse<boolean> | ErrorResponse> => {
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
    return {
      message: "An error occurred during enroll course",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const withdrawCourse = async (
  userID: string,
  instructorID: string,
  courseID: string
): Promise<SuccessResponse<boolean> | ErrorResponse> => {
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
    return {
      message: "An error occurred during enroll course",
      error: error instanceof Error ? error.message : String(error),
    };
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
