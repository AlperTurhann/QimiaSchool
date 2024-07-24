import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useCourseContext } from "@/context/CourseContext";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useDeleteCourseHook = (
  setCourses?: Dispatch<SetStateAction<CourseProps[]>>
) => {
  const { showAlert } = useAlertContext();
  const { deleteCourse } = useCourseContext();
  const { dispatch, getUser } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteCourse = useCallback(
    async (courseID: string) => {
      try {
        setLoading(true);
        const isSuccesfull = await deleteCourse(courseID);
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
      } catch (error) {
        showAlert(
          "Error",
          error instanceof Error ? error.message : String(error)
        );
      } finally {
        setLoading(false);
      }
    },
    [deleteCourse, getUser, showAlert]
  );

  return { handleDeleteCourse, loading };
};

export default useDeleteCourseHook;
