"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useEnrollCourseHook = (
  setEnrolledUsers: Dispatch<SetStateAction<UserProps[]>>
) => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { state, dispatch, getUser, enrollCourse } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEnrollCourse = useCallback(
    async (courseID: string) => {
      try {
        if (state.user) {
          setLoading(true);
          const isSuccesfull = await enrollCourse(state.user.id, courseID);
          if (typeof isSuccesfull !== "string") {
            if (isSuccesfull.data) {
              setEnrolledUsers((prevUsers) => [
                ...prevUsers,
                state.user as UserProps,
              ]);
              dispatch({ type: "ENROLL_COURSE", payload: courseID });
              showAlert(isSuccesfull.message);
            } else {
              showAlert(isSuccesfull.message);
            }
          } else {
            showErrorAlert(isSuccesfull);
          }
        }
      } catch (error) {
        showErrorAlert("transactionError");
      } finally {
        setLoading(false);
      }
    },
    [enrollCourse, getUser, showAlert, showErrorAlert]
  );

  return { handleEnrollCourse, loading };
};

export default useEnrollCourseHook;
