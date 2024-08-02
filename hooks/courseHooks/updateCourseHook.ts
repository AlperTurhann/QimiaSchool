"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CourseProps } from "@/types/CourseTypes";
import { useAlertContext } from "@/context/AlertContext";
import { useCourseContext } from "@/context/CourseContext";
import { useUserContext } from "@/context/UserContext";

const useUpdateCourseHook = () => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { state, dispatch, getUser } = useUserContext();
  const { updateCourse } = useCourseContext();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();

  const fetchUpdateCourse = useCallback(
    async (courseData: CourseProps) => {
      try {
        if (state.user) {
          setLoading(true);
          const fetchedUpdateCourse = await updateCourse(
            state.user.id,
            courseData
          );
          if (typeof fetchedUpdateCourse !== "string") {
            if (fetchedUpdateCourse.data) {
              const updatedUser = await getUser(state.user.id);
              if (typeof updatedUser !== "string")
                dispatch({ type: "SET_USER", payload: updatedUser.data });
              showAlert(fetchedUpdateCourse.message);
              navigate.push(`/courses/${courseData.id}`);
            } else {
              showAlert(fetchedUpdateCourse.message);
            }
          } else {
            showErrorAlert(fetchedUpdateCourse);
          }
        }
      } catch (error) {
        showErrorAlert("transactionError");
      } finally {
        setLoading(false);
      }
    },
    [updateCourse, showAlert, showErrorAlert]
  );

  return { updateCourse: fetchUpdateCourse, loading };
};

export default useUpdateCourseHook;
