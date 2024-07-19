import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useUserContext } from "@/context/UserContext";

const useLeaveCourseHook = (
  setCourses?: Dispatch<SetStateAction<CourseProps[]>>
) => {
  const { leaveCourse } = useUserContext();
  const { state, dispatch, getUser } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLeaveCourse = useCallback(
    async (courseID: string) => {
      try {
        if (state.user) {
          setLoading(true);
          await leaveCourse(state.user.id, courseID);
          if (setCourses) {
            setCourses((prevCourses) =>
              prevCourses.filter((course) => course.id !== courseID)
            );
          }
          const updatedUser = await getUser(state.user.id);
          dispatch({ type: "SET_USER", payload: updatedUser });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [leaveCourse, state.user, getUser]
  );

  return { handleLeaveCourse, loading };
};

export default useLeaveCourseHook;
