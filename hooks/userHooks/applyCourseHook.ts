import { useCallback, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useApplyCourseHook = () => {
  const { showAlert } = useAlertContext();
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
          if ("data" in isSuccesfull) {
            if (isSuccesfull.data) {
              dispatch({ type: "APPLY_COURSE", payload: courseID });
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
    [applyCourse, state.user, getUser]
  );

  return { handleApplyCourse, loading };
};

export default useApplyCourseHook;
