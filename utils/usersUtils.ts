import { LoginProps, RegisterProps, UserProps } from "@/types/UserTypes";
import { parseJSON } from "@/utils/fileUtils/IFileUtils";

const getUsers = async (): Promise<UserProps[]> => {
  try {
    const response = await fetch("/api/auth/users");

    const getUsersData = await parseJSON(response);
    if (response.ok) {
      console.log(getUsersData.message);
      return getUsersData.users;
    }
    console.error(getUsersData.message);
    return [];
  } catch (error) {
    console.error("An error occurred during getting users: ", error);
    return [];
  }
};

const getUser = async (userID: string): Promise<UserProps | null> => {
  try {
    const response = await fetch(`/api/auth/users/${userID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userID),
    });

    const getUserData = await parseJSON(response);
    if (response.ok) {
      console.log(getUserData.message);
      return getUserData.user;
    }
    console.error(getUserData.message);
    return null;
  } catch (error) {
    console.error("An error occurred during getting user: ", error);
    return null;
  }
};

const login = async (data: LoginProps): Promise<UserProps | null> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const registerData = await parseJSON(response);
    if (response.ok) {
      console.log(registerData.message);
      return registerData.user;
    }
    console.error(registerData.message);
    return null;
  } catch (error) {
    console.error("An error occurred during login: ", error);
    return null;
  }
};

const logout = (): void => {
  console.log("You are logged out!");
};

const signup = async (data: RegisterProps): Promise<UserProps | null> => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const registerData = await response.json();
    if (response.ok) {
      console.log(registerData.message);
      return registerData.user;
    }
    console.error(registerData.message);
    return null;
  } catch (error) {
    console.error("An error occurred during signup: ", error);
    return null;
  }
};

const leaveCourse = async (
  userID: string,
  courseID: string
): Promise<boolean> => {
  try {
    const response = await fetch(`/api/auth/users/${userID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID, courseID, isEnroll: false }),
    });
    const leaveData = await response.json();
    if (response.ok) {
      console.log(leaveData.message);
      return true;
    }
    console.error(leaveData.message);
    return false;
  } catch (error) {
    console.error("An error occurred during leave course: ", error);
    return false;
  }
};

const enrollCourse = async (
  userID: string,
  courseID: string
): Promise<boolean> => {
  try {
    const response = await fetch(`/api/auth/users/${userID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID, courseID, isEnroll: true }),
    });
    const enrollData = await response.json();
    if (response.ok) {
      console.log(enrollData.message);
      return true;
    }
    console.error(enrollData.message);
    return false;
  } catch (error) {
    console.error("An error occurred during leave course: ", error);
    return false;
  }
};

export { getUsers, getUser, login, logout, signup, leaveCourse, enrollCourse };
