import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CreateCourseProps } from "@/types/CourseTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useCourseContext } from "@/context/CourseContext";

const useCreateCourseHook = () => {
  const { showAlert } = useAlertContext();
  const { createCourse } = useCourseContext();
  const { state, dispatch, getUser } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();

  const fetchCreateCourse = useCallback(
    async (courseData: CreateCourseProps) => {
      try {
        setLoading(true);
        const fetchedCreateCourse = await createCourse(courseData);
        if ("data" in fetchedCreateCourse) {
          if (fetchedCreateCourse.data && state.user) {
            const updatedUser = await getUser(state.user.id);
            if ("data" in updatedUser) {
              dispatch({ type: "SET_USER", payload: updatedUser.data });
              showAlert("Success", fetchedCreateCourse.message);
              navigate.push(`/courses/${fetchedCreateCourse.data}`);
            } else {
              showAlert("Error", updatedUser.error);
            }
          } else {
            showAlert("Error", fetchedCreateCourse.message);
          }
        } else {
          showAlert("Error", fetchedCreateCourse.error);
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
    [createCourse]
  );

  return { createCourse: fetchCreateCourse, loading };
};

export default useCreateCourseHook;
