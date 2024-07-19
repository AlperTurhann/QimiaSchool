import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useCourseContext } from "@/context/CourseContext";
import { useUserContext } from "@/context/UserContext";

const useDeleteCourseHook = (
  setCourses?: Dispatch<SetStateAction<CourseProps[]>>
) => {
  const { deleteCourse } = useCourseContext();
  const { state, dispatch, getUser } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteCourse = useCallback(
    async (courseID: string) => {
      try {
        setLoading(true);
        await deleteCourse(courseID);
        if (setCourses) {
          setCourses((prevCourses) =>
            prevCourses.filter((course) => course.id !== courseID)
          );
        }
        if (state.user) {
          const updatedInstructor = await getUser(state.user.id);
          dispatch({ type: "SET_USER", payload: updatedInstructor });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [deleteCourse, state.user, getUser]
  );

  return { handleDeleteCourse, loading };
};

export default useDeleteCourseHook;
