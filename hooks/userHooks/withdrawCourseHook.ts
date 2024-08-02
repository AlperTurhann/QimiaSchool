"use client";
import { useCallback, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useWithdrawCourseHook = () => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { state, dispatch, getUser, withdrawCourse } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleWithdrawCourse = useCallback(
    async (instructorID: string, courseID: string) => {
      try {
        if (state.user) {
          setLoading(true);
          const isSuccesfull = await withdrawCourse(
            state.user.id,
            instructorID,
            courseID
          );
          if (typeof isSuccesfull !== "string") {
            if (isSuccesfull.data) {
              dispatch({ type: "WITHDRAW_COURSE", payload: courseID });
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
    [withdrawCourse, getUser, showAlert, showErrorAlert]
  );

  return { handleWithdrawCourse, loading };
};

export default useWithdrawCourseHook;
