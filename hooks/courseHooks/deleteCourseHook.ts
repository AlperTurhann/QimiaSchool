import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { useCourseContext } from "@/context/CourseContext";
import { useUserContext } from "@/context/UserContext";

const useDeleteCourseHook = (
  setCourses?: Dispatch<SetStateAction<CourseProps[]>>
) => {
  const { deleteCourse } = useCourseContext();
  const { dispatch, getUser } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteCourse = useCallback(
    async (courseID: string) => {
      try {
        setLoading(true);
        const isSuccesfull = await deleteCourse(courseID);
        if (isSuccesfull) {
          if (setCourses) {
            setCourses((prevCourses) =>
              prevCourses.filter((course) => course.id !== courseID)
            );
          }
          dispatch({ type: "LEAVE_COURSE", payload: courseID });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [deleteCourse, getUser]
  );

  return { handleDeleteCourse, loading };
};

export default useDeleteCourseHook;
