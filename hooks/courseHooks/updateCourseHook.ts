import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CourseProps } from "@/types/CourseTypes";
import { useAlertContext } from "@/context/AlertContext";
import { useCourseContext } from "@/context/CourseContext";
import { useUserContext } from "@/context/UserContext";

const useUpdateCourseHook = () => {
  const { showAlert } = useAlertContext();
  const { state } = useUserContext();
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
          if ("data" in fetchedUpdateCourse) {
            if (fetchedUpdateCourse.data) {
              showAlert("Success", fetchedUpdateCourse.message);
              navigate.push(`/courses/${courseData.id}`);
            } else {
              showAlert("Error", fetchedUpdateCourse.message);
            }
          } else {
            showAlert("Error", fetchedUpdateCourse.error);
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
    [updateCourse]
  );

  return { updateCourse: fetchUpdateCourse, loading };
};

export default useUpdateCourseHook;
