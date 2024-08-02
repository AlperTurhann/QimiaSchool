"use client";
import { useCallback, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useApplyCourseHook = () => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { state, dispatch, getUser, applyCourse } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleApplyCourse = useCallback(
    async (instructorID: string, courseID: string) => {
      try {
        if (state.user) {
          setLoading(true);
          const isSuccesfull = await applyCourse(
            state.user.id,
            instructorID,
            courseID
          );
          if (typeof isSuccesfull !== "string") {
            if (isSuccesfull.data) {
              dispatch({ type: "APPLY_COURSE", payload: courseID });
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
    [applyCourse, getUser, showAlert, showErrorAlert]
  );

  return { handleApplyCourse, loading };
};

export default useApplyCourseHook;
