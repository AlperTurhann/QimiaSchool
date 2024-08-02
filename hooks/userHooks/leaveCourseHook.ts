"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useLeaveCourseHook = (
  setEnrolledUsers: Dispatch<SetStateAction<UserProps[]>>
) => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { state, dispatch, getUser, leaveCourse } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLeaveCourse = useCallback(
    async (courseID: string) => {
      try {
        if (state.user) {
          setLoading(true);
          const isSuccesfull = await leaveCourse(state.user.id, courseID);
          if (typeof isSuccesfull !== "string") {
            if (isSuccesfull.data) {
              setEnrolledUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== state.user?.id)
              );
              dispatch({ type: "LEAVE_COURSE", payload: courseID });
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
    [leaveCourse, getUser, showAlert, showErrorAlert]
  );

  return { handleLeaveCourse, loading };
};

export default useLeaveCourseHook;
