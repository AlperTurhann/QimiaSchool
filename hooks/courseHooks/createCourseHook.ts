"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CreateCourseProps } from "@/types/CourseTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useCourseContext } from "@/context/CourseContext";

const useCreateCourseHook = () => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { createCourse } = useCourseContext();
  const { state, dispatch } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();

  const fetchCreateCourse = useCallback(
    async (courseData: CreateCourseProps) => {
      try {
        setLoading(true);
        if (state.user) {
          const fetchedCreateCourse = await createCourse(courseData);
          if (typeof fetchedCreateCourse !== "string") {
            if (fetchedCreateCourse.data) {
              dispatch({
                type: "CREATE_COURSE",
                payload: fetchedCreateCourse.data,
              });
              showAlert(fetchedCreateCourse.message);
              navigate.push(`/courses/${fetchedCreateCourse.data}`);
            } else {
              showAlert(fetchedCreateCourse.message);
            }
          } else {
            showErrorAlert(fetchedCreateCourse);
          }
        }
      } catch (error) {
        showErrorAlert("transactionError");
      } finally {
        setLoading(false);
      }
    },
    [createCourse, showAlert, showErrorAlert]
  );

  return { createCourse: fetchCreateCourse, loading };
};

export default useCreateCourseHook;
