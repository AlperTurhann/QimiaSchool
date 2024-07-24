import { useCallback, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useWithdrawCourseHook = () => {
  const { showAlert } = useAlertContext();
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
          if ("data" in isSuccesfull) {
            if (isSuccesfull.data) {
              dispatch({ type: "WITHDRAW_COURSE", payload: courseID });
              showAlert("Success", isSuccesfull.message);
            } else {
              showAlert("Error", isSuccesfull.message);
            }
          } else {
            showAlert("Error", isSuccesfull.error);
          }
        }
      } catch (error) {
        showAlert(
          "Error",
          error instanceof Error ? error.message : String(error)
        );
      } finally {
        setLoading(false);
      }
    },
    [withdrawCourse, getUser, showAlert]
  );

  return { handleWithdrawCourse, loading };
};

export default useWithdrawCourseHook;
