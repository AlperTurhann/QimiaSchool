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

  const updateUserAfterCourseCreation = useCallback(
    async (userID: string) => {
      const updatedUser = await getUser(userID);
      if ("data" in updatedUser) {
        dispatch({ type: "SET_USER", payload: updatedUser.data });
        return true;
      } else {
        showAlert("Error", updatedUser.error);
        return false;
      }
    },
    [getUser, showAlert]
  );

  const fetchCreateCourse = useCallback(
    async (courseData: CreateCourseProps) => {
      try {
        setLoading(true);
        const fetchedCreateCourse = await createCourse(courseData);
        if ("data" in fetchedCreateCourse) {
          if (fetchedCreateCourse.data && state.user) {
            if (await updateUserAfterCourseCreation(state.user.id)) {
              showAlert("Success", fetchedCreateCourse.message);
              navigate.push(`/courses/${fetchedCreateCourse.data}`);
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
    [createCourse, showAlert]
  );

  return { createCourse: fetchCreateCourse, loading };
};

export default useCreateCourseHook;
