"use client";
import { useState, useEffect, useCallback } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { useCourseContext } from "@/context/CourseContext";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useCoursePageHook = (courseID: string) => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { getCourse } = useCourseContext();
  const { state, getUser } = useUserContext();
  const [course, setCourse] = useState<CourseProps | null>(null);
  const [instructor, setInstructor] = useState<UserProps | null>(null);
  const [enrolledUsers, setEnrolledUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInstructor = useCallback(
    async (instructorID: string) => {
      const fetchedInstructor = await getUser(instructorID);
      if (typeof fetchedInstructor !== "string") {
        setInstructor(fetchedInstructor.data);
      } else showErrorAlert(fetchedInstructor);
    },
    [getUser, showErrorAlert]
  );

  const fetchEnrolledUsers = useCallback(
    async (studentIDs: string[]) => {
      if (state.user) {
        const fetchedEnrolledUsers = await Promise.all(
          studentIDs.map(async (studentID) => {
            const response = await getUser(studentID);
            return typeof response !== "string" ? response.data : null;
          })
        );
        setEnrolledUsers(fetchedEnrolledUsers.filter((user) => user !== null));
      }
    },
    [getUser]
  );

  const fetchCourse = useCallback(async () => {
    const fetchedCourse = await getCourse(courseID);
    if (typeof fetchedCourse !== "string") {
      if (fetchedCourse.data) {
        setCourse(fetchedCourse.data);
        await fetchInstructor(fetchedCourse.data.instructor);
        await fetchEnrolledUsers(fetchedCourse.data.enrolledStudents);
      } else {
        showAlert(fetchedCourse.message);
      }
    } else {
      showErrorAlert(fetchedCourse);
    }
  }, [
    getCourse,
    fetchInstructor,
    fetchEnrolledUsers,
    showAlert,
    showErrorAlert,
  ]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      await fetchCourse();
    } catch (error) {
      showErrorAlert("transactionError");
    } finally {
      setLoading(false);
    }
  }, [fetchCourse, showErrorAlert]);

  useEffect(() => {
    fetchData();
  }, [courseID, fetchData]);

  return { course, instructor, enrolledUsers, setEnrolledUsers, loading };
};

export default useCoursePageHook;
