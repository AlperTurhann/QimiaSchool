"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useCoursePageHook from "@/hooks/courseHooks/coursePageHook";
import useLeaveCourseHook from "@/hooks/userHooks/leaveCourseHook";
import useEnrollCourseHook from "@/hooks/userHooks/enrollCourseHook";
import useDeleteCourseHook from "@/hooks/courseHooks/deleteCourseHook";
import useAcceptCourseInvitationHook from "@/hooks/invitationHooks/acceptCourseInvitationHook";
import useDeclineCourseInvitationHook from "@/hooks/invitationHooks/declineCourseInvitationHook";
import useApplyCourseHook from "@/hooks/userHooks/applyCourseHook";
import useWithdrawCourseHook from "@/hooks/userHooks/withdrawCourseHook";
import { InvitationProps } from "@/types/InvitationTypes";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import EnrolledStudents from "@/components/shared/EnrolledStudents";
import Loading from "@/components/shared/Loading";

const CoursePage = () => {
  const { state } = useUserContext();
  const { courseID } = useParams<{ courseID: string }>();
  const [invitation, setInvitation] = useState<InvitationProps | null>(null);
  const [isInvited, setIsInvited] = useState<boolean>(false);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [isEnrollable, setIsEnrollable] = useState<boolean>(false);
  const navigate = useRouter();

  const {
    course,
    instructor,
    enrolledUsers,
    setEnrolledUsers,
    loading: coursePageLoading,
  } = useCoursePageHook(courseID);
  const { handleEnrollCourse, loading: enrollLoading } =
    useEnrollCourseHook(setEnrolledUsers);
  const { handleLeaveCourse, loading: leaveLoading } =
    useLeaveCourseHook(setEnrolledUsers);
  const { handleApplyCourse, loading: applyLoading } = useApplyCourseHook();
  const { handleWithdrawCourse, loading: withdrawLoading } =
    useWithdrawCourseHook();
  const { handleDeleteCourse } = useDeleteCourseHook();
  const { handleAcceptCourseInvitation, loading: acceptCourseLoading } =
    useAcceptCourseInvitationHook(undefined, setEnrolledUsers);
  const { handleDeclineCourseInvitation, loading: declineCourseLoading } =
    useDeclineCourseInvitationHook();

  useEffect(() => {
    let invited: boolean = false;
    let enrolled: boolean = false;
    let applied: boolean = false;
    let enrollable: boolean = false;

    if (state.user && course) {
      state.user.invitations.some((invitation) => {
        if (invitation.courseID === courseID) {
          setInvitation(invitation);
          invited = true;
        }
      });
      if (!invited) {
        applied = state.user.appliedCourses.includes(courseID);
        enrolled = state.user.courses.includes(courseID);
        enrollable =
          !applied &&
          !enrolled &&
          course.capacity > course.enrolledStudents.length;
      }
    }

    setIsInvited(invited);
    setIsEnrolled(enrolled);
    setIsApplied(applied);
    setIsEnrollable(enrollable);
  }, [state.user, course]);

  const handleClickEnroll = async () => {
    if (isEnrolled) await handleLeaveCourse(courseID);
    else await handleEnrollCourse(courseID);
  };

  const handleClickApply = async () => {
    if (instructor) {
      if (isApplied) await handleWithdrawCourse(instructor.id, courseID);
      else await handleApplyCourse(instructor.id, courseID);
    }
  };

  const handleClickDelete = async () => {
    await handleDeleteCourse(courseID);
    navigate.push("/");
  };

  const handleClickAccept = async () => {
    if (invitation) {
      await handleAcceptCourseInvitation(invitation);
    }
  };

  const handleClickDecline = async () => {
    if (invitation) {
      await handleDeclineCourseInvitation(invitation);
    }
  };

  if (!course) return <p>Course not found!</p>;
  if (!instructor) return null;
  if (
    coursePageLoading ||
    enrollLoading ||
    leaveLoading ||
    applyLoading ||
    withdrawLoading ||
    acceptCourseLoading ||
    declineCourseLoading
  )
    return <Loading />;
  return (
    <main className="w-full h-full relative flex flex-col items-center text-center gap-5">
      <Button
        type="button"
        variant="link"
        onClick={() => navigate.push(`/users/${course.instructor}`)}
        className="z-10 absolute top-0 right-0"
      >
        <span className="text-xs text-gray-500 md:text-sm">
          <strong>Instructor: </strong>
          {instructor.name}
        </span>
      </Button>
      <h1 className="text-2xl font-bold mt-7 sm:mt-0">{course.name}</h1>
      <p>{course.description}</p>
      <EnrolledStudents type="view" enrolledUsers={enrolledUsers} />
      <div className={`${!state.user && "hidden"}`}>
        <div className={`${state.user?.role !== "student" && "hidden"}`}>
          <div className={`${isInvited && "hidden"}`}>
            <div className={`${course.accessLevel !== "everyone" && "hidden"}`}>
              <Button
                type="button"
                onClick={handleClickEnroll}
                className={`${!isEnrollable && "hidden"}`}
              >
                Enroll in the course
              </Button>
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={handleClickEnroll}
              className={`${!isEnrolled && "hidden"}`}
            >
              De-enroll from the course
            </Button>
            <div
              className={`${
                course.accessLevel !== "accepted only" && "hidden"
              }`}
            >
              <Button
                type="button"
                onClick={handleClickApply}
                className={`${!isEnrollable && "hidden"}`}
              >
                Apply to the course
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleClickApply}
                className={`${!isApplied && "hidden"}`}
              >
                Withdraw from the course
              </Button>
            </div>
          </div>
          <div
            className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${
              !isInvited && "hidden"
            }`}
          >
            <Button type="button" onClick={handleClickAccept}>
              Accept the invitation
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleClickDecline}
            >
              Decline the invitation
            </Button>
          </div>
        </div>
        <Button
          type="button"
          variant="destructive"
          onClick={handleClickDelete}
          className={`${state.user?.id !== instructor.id && "hidden"}`}
        >
          Delete the course
        </Button>
      </div>
    </main>
  );
};

export default CoursePage;
