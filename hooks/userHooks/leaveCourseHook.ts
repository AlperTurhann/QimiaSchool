import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useLeaveCourseHook = (
  setCourses?: Dispatch<SetStateAction<CourseProps[]>>
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
              if (setCourses) {
                setCourses((prevCourses) =>
                  prevCourses.filter((course) => course.id !== courseID)
                );
              }
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
