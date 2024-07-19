import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useLeaveCourseHook = (
  setEnrolledUsers: Dispatch<SetStateAction<UserProps[]>>
) => {
  const { showAlert } = useAlertContext();
  const { leaveCourse } = useUserContext();
  const { state, dispatch, getUser } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLeaveCourse = useCallback(
    async (courseID: string) => {
      try {
        if (state.user) {
          setLoading(true);
          const isSuccesfull = await leaveCourse(state.user.id, courseID);
          if ("data" in isSuccesfull) {
            if (isSuccesfull.data) {
              setEnrolledUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== state.user?.id)
              );
              dispatch({ type: "LEAVE_COURSE", payload: courseID });
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
    [leaveCourse, state.user, getUser]
  );

  return { handleLeaveCourse, loading };
};

export default useLeaveCourseHook;
