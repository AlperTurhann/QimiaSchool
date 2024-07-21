"use client";
import { ReactNode, useCallback, useMemo, useReducer } from "react";
import * as userUtils from "@/utils/usersUtils";
import { UserAction, UserContext, UserState } from "@/context/UserContext";

interface Props {
  children: ReactNode;
}

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      return { ...state, user: null };
    case "ENROLL_COURSE":
      return state.user
        ? {
            ...state,
            user: {
              ...state.user,
              courses: [...state.user.courses, action.payload],
            },
          }
        : state;
    case "LEAVE_COURSE":
      return state.user
        ? {
            ...state,
            user: {
              ...state.user,
              courses: state.user.courses.filter(
                (courseID) => courseID !== action.payload
              ),
            },
          }
        : state;
    case "ACCEPT_COURSE_INVITATION":
      return state.user
        ? {
            ...state,
            user: {
              ...state.user,
              courses: [...state.user.courses, action.payload.invitedCourseID],
              courseInvitations: state.user.courseInvitations.filter(
                (invitation) =>
                  invitation.invitationID !== action.payload.invitationID
              ),
            },
          }
        : state;
    case "DECLINE_COURSE_INVITATION":
      return state.user
        ? {
            ...state,
            user: {
              ...state.user,
              courseInvitations: state.user.courseInvitations.filter(
                (invitation) => invitation.invitationID !== action.payload
              ),
            },
          }
        : state;
    default:
      return state;
  }
};

const UserProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  const getUsers = useCallback(userUtils.getUsers, []);
  const getUser = useCallback(userUtils.getUser, []);
  const login = useCallback(userUtils.login, []);
  const logout = useCallback(userUtils.logout, []);
  const signup = useCallback(userUtils.signup, []);
  const leaveCourse = useCallback(userUtils.leaveCourse, []);
  const enrollCourse = useCallback(userUtils.enrollCourse, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      getUsers,
      getUser,
      login,
      logout,
      signup,
      leaveCourse,
      enrollCourse,
    }),
    [state, getUsers, getUser, login, logout, signup, leaveCourse, enrollCourse]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
