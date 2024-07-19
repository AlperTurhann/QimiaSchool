import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useUserContext } from "@/context/UserContext";

const useEnrollCourseHook = (
  setCourses?: Dispatch<SetStateAction<CourseProps[]>>
) => {
  const { enrollCourse } = useUserContext();
  const { state, dispatch, getUser } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEnrollCourse = useCallback(
    async (courseID: string) => {
      try {
        if (state.user) {
          setLoading(true);
          const isSuccesfull = await enrollCourse(state.user.id, courseID);
          if (isSuccesfull) {
            if (setCourses) {
              setCourses((prevCourses) =>
                prevCourses.filter((course) => course.id !== courseID)
              );
            }
            dispatch({ type: "ENROLL_COURSE", payload: courseID });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [enrollCourse, state.user, getUser]
  );

  return { handleEnrollCourse, loading };
};

export default useEnrollCourseHook;
