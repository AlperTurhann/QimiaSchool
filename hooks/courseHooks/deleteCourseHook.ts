"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useCourseContext } from "@/context/CourseContext";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useDeleteCourseHook = (
  setCourses?: Dispatch<SetStateAction<CourseProps[]>>
) => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { deleteCourse } = useCourseContext();
  const { state, dispatch } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteCourse = useCallback(
    async (courseID: string) => {
      try {
        setLoading(true);
        if (state.user) {
          const isSuccesfull = await deleteCourse(courseID);
          if (typeof isSuccesfull !== "string") {
            if (isSuccesfull.data) {
              if (setCourses) {
                setCourses((prevCourses) =>
                  prevCourses.filter((course) => course.id !== courseID)
                );
              }
              dispatch({ type: "DELETE_COURSE", payload: courseID });
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
    [deleteCourse, showAlert, showErrorAlert]
  );

  return { handleDeleteCourse, loading };
};

export default useDeleteCourseHook;
