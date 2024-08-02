"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import useCoursePageHook from "@/hooks/courseHooks/coursePageHook";
import useEnrollmentHooks from "@/hooks/courseHooks/enrollmentHooks";
import { CourseState } from "@/types/CourseTypes";
import { InvitationProps } from "@/types/InvitationTypes";
import { useUserContext } from "@/context/UserContext";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import EnrolledStudents from "@/components/shared/EnrolledStudents";
import { UserActions } from "@/components/actions/UserActions";

const CourseInfos = () => {
  const { state } = useUserContext();
  const { courseID } = useParams<{ courseID: string }>();
  const t = useTranslations("models.course");
  const navigate = useRouter();

  const [invitation, setInvitation] = useState<InvitationProps | null>(null);
  const [courseState, setCourseState] = useState<CourseState>({
    isInvited: false,
    isEnrolled: false,
    isApplied: false,
    isEnrollable: false,
  });

  const {
    course,
    instructor,
    enrolledUsers,
    setEnrolledUsers,
    loading: coursePageLoading,
  } = useCoursePageHook(courseID);

  const {
    handleEnrollCourse,
    handleLeaveCourse,
    handleApplyCourse,
    handleWithdrawCourse,
    handleDeleteCourse,
    handleAcceptCourseInvitation,
    handleDeclineCourseInvitation,
    enrollLoading,
    leaveLoading,
    applyLoading,
    withdrawLoading,
    deleteLoading,
    acceptCourseLoading,
    declineCourseLoading,
  } = useEnrollmentHooks(setEnrolledUsers);

  useEffect(() => {
    updateCourseState();
  }, [state.user, course]);

  const updateCourseState = () => {
    if (!state.user || !course) return;

    const invited = state.user.invitations.some((inv) => {
      if (inv.courseID === courseID) {
        setInvitation(inv);
        return true;
      }
      return false;
    });

    if (!invited) {
      setCourseState({
        isInvited: false,
        isApplied: state.user.appliedCourses.includes(courseID),
        isEnrolled: state.user.courses.includes(courseID),
        isEnrollable:
          !state.user.appliedCourses.includes(courseID) &&
          !state.user.courses.includes(courseID) &&
          course.capacity > course.enrolledStudents.length,
      });
    } else {
      setCourseState({
        isInvited: true,
        isApplied: false,
        isEnrolled: false,
        isEnrollable: false,
      });
    }
  };

  const handleEnrollAction = () =>
    courseState.isEnrolled
      ? handleLeaveCourse(courseID)
      : handleEnrollCourse(courseID);

  const handleApplyAction = () => {
    if (!instructor) return;
    courseState.isApplied
      ? handleWithdrawCourse(instructor.id, courseID)
      : handleApplyCourse(instructor.id, courseID);
  };

  const handleDeleteAction = async () => {
    await handleDeleteCourse(courseID);
    navigate.push("/");
  };

  const handleInvitationAction = (accept: boolean) => {
    if (!invitation) return;
    accept
      ? handleAcceptCourseInvitation(invitation)
      : handleDeclineCourseInvitation(invitation);
  };

  if (!course) return <p>{t("noFound")}</p>;
  if (!instructor) return null;
  if (
    coursePageLoading ||
    enrollLoading ||
    leaveLoading ||
    applyLoading ||
    withdrawLoading ||
    deleteLoading ||
    acceptCourseLoading ||
    declineCourseLoading
  )
    return <Loading />;
  return (
    <>
      <Button
        type="button"
        variant="link"
        onClick={() => navigate.push(`/users/${instructor.id}`)}
        className="z-10 absolute top-0 right-0"
      >
        <span className="text-xs text-gray-500 md:text-sm">
          <strong>{t("instructor")}: </strong>
          {instructor.name}
        </span>
      </Button>
      <h1 className="text-2xl font-bold mt-7 sm:mt-0">{course.name}</h1>
      <p>{course.description}</p>
      <EnrolledStudents type="view" enrolledUsers={enrolledUsers} />
      {state.user && (
        <UserActions
          userRole={state.user.role}
          courseState={courseState}
          course={course}
          instructor={instructor}
          handleEnrollAction={handleEnrollAction}
          handleApplyAction={handleApplyAction}
          handleDeleteAction={handleDeleteAction}
          handleInvitationAction={handleInvitationAction}
          userId={state.user.id}
        />
      )}
    </>
  );
};

export default CourseInfos;
