import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useEnrollCourseHook = (
  setCourses?: Dispatch<SetStateAction<CourseProps[]>>
) => {
  const { showAlert } = useAlertContext();
  const { enrollCourse } = useUserContext();
  const { state, dispatch, getUser } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEnrollCourse = useCallback(
    async (courseID: string) => {
      try {
        if (state.user) {
          setLoading(true);
          const isSuccesfull = await enrollCourse(state.user.id, courseID);
          if ("data" in isSuccesfull) {
            if (isSuccesfull.data) {
              if (setCourses) {
                setCourses((prevCourses) =>
                  prevCourses.filter((course) => course.id !== courseID)
                );
              }
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
    [enrollCourse, state.user, getUser]
  );

  return { handleEnrollCourse, loading };
};

export default useEnrollCourseHook;
