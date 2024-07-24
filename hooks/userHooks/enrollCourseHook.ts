import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useEnrollCourseHook = (
  setEnrolledUsers: Dispatch<SetStateAction<UserProps[]>>
) => {
  const { showAlert } = useAlertContext();
  const { state, dispatch, getUser, enrollCourse } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEnrollCourse = useCallback(
    async (courseID: string) => {
      try {
        if (state.user) {
          setLoading(true);
          const isSuccesfull = await enrollCourse(state.user.id, courseID);
          if ("data" in isSuccesfull) {
            if (isSuccesfull.data) {
              setEnrolledUsers((prevUsers) => [
                ...prevUsers,
                state.user as UserProps,
              ]);
              dispatch({ type: "ENROLL_COURSE", payload: courseID });
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
    [enrollCourse, getUser, showAlert]
  );

  return { handleEnrollCourse, loading };
};

export default useEnrollCourseHook;
