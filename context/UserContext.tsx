import { createContext, useContext, Dispatch } from "react";
import { UserProps } from "@/types/UserTypes";
import * as userUtils from "@/utils/usersUtils";

type UserAction =
  | { type: "SET_USER"; payload: UserProps | null }
  | { type: "CLEAR_USER" }
  | { type: "ENROLL_COURSE"; payload: string }
  | { type: "LEAVE_COURSE"; payload: string };

type UserState = {
  user: UserProps | null;
};

type UserContextType = {
  state: UserState;
  dispatch: Dispatch<UserAction>;
  getUsers: typeof userUtils.getUsers;
  getUser: typeof userUtils.getUser;
  login: typeof userUtils.login;
  logout: typeof userUtils.logout;
  signup: typeof userUtils.signup;
  leaveCourse: typeof userUtils.leaveCourse;
  enrollCourse: typeof userUtils.enrollCourse;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserContext, useUserContext };
export type { UserAction, UserState, UserContextType };
