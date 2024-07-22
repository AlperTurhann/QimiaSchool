import { createContext, useContext, Dispatch } from "react";
import { UserProps } from "@/types/UserTypes";
import { InvitationProps } from "@/types/InvitationTypes";
import * as userUtils from "@/utils/usersUtils";

type UserAction =
  | { type: "SET_USER"; payload: UserProps | null }
  | { type: "CLEAR_USER" }
  | { type: "ENROLL_COURSE"; payload: string }
  | { type: "LEAVE_COURSE"; payload: string }
  | { type: "APPLY_COURSE"; payload: string }
  | { type: "WITHDRAW_COURSE"; payload: string }
  | { type: "ACCEPT_COURSE_INVITATION"; payload: InvitationProps }
  | { type: "DECLINE_COURSE_INVITATION"; payload: string }
  | { type: "ACCEPT_JOIN_INVITATION"; payload: string }
  | { type: "DECLINE_JOIN_INVITATION"; payload: string };

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
  enrollCourse: typeof userUtils.enrollCourse;
  leaveCourse: typeof userUtils.leaveCourse;
  applyCourse: typeof userUtils.applyCourse;
  withdrawCourse: typeof userUtils.withdrawCourse;
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
