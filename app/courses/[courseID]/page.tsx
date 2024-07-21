"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useCoursePageHook from "@/hooks/courseHooks/coursePageHook";
import useLeaveCourseHook from "@/hooks/userHooks/leaveCourseHook";
import useEnrollCourseHook from "@/hooks/userHooks/enrollCourseHook";
import useDeleteCourseHook from "@/hooks/courseHooks/deleteCourseHook";
import useAcceptInvitationHook from "@/hooks/invitationHooks/acceptInvitationHook";
import useDeclineInvitationHook from "@/hooks/invitationHooks/declineInvitationHook";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import EnrolledStudents from "@/components/shared/EnrolledStudents";
import Loading from "@/components/shared/Loading";
import { InvitationProps } from "@/types/InvitationTypes";

const CoursePage = () => {
  const { state } = useUserContext();
  const { courseID } = useParams<{ courseID: string }>();
  const [invitation, setInvitation] = useState<InvitationProps | null>(null);
  const [isInvited, setIsInvited] = useState<boolean>(false);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [isEnrollable, setIsEnrollable] = useState<boolean>(false);
  const navigate = useRouter();

  const {
    course,
    instructor,
    enrolledUsers,
    setEnrolledUsers,
    loading: coursePageLoading,
  } = useCoursePageHook(courseID);
  const { handleLeaveCourse, loading: leaveLoading } =
    useLeaveCourseHook(setEnrolledUsers);
  const { handleEnrollCourse, loading: enrollLoading } =
    useEnrollCourseHook(setEnrolledUsers);
  const { handleDeleteCourse } = useDeleteCourseHook();
  const { handleAcceptInvitation, loading: acceptLoading } =
    useAcceptInvitationHook(undefined, setEnrolledUsers);
  const { handleDeclineInvitation, loading: declineLoading } =
    useDeclineInvitationHook();

  useEffect(() => {
    let invited: boolean = false;
    let enrolled: boolean = false;
    let enrollable: boolean = false;

    if (state.user) {
      state.user.courseInvitations.some((invitation) => {
        if (invitation.invitedCourseID === courseID) {
          setInvitation(invitation);
          invited = true;
        }
      });
      if (!invited) {
        setInvitation(null);
        enrolled = state.user.courses.includes(courseID);
        if (
          course &&
          !enrolled &&
          course.capacity > course.enrolledStudents.length
        )
          enrollable = true;
      }
    }

    setIsInvited(invited);
    setIsEnrolled(enrolled);
    setIsEnrollable(enrollable);
  }, [state.user, course]);

  const handleClickEnroll = async () => {
    if (isEnrolled) {
      await handleLeaveCourse(courseID);
    } else {
      await handleEnrollCourse(courseID);
    }
  };

  const handleClickDelete = async () => {
    await handleDeleteCourse(courseID);
    navigate.push("/");
  };

  const handleClickAccept = async () => {
    if (invitation) {
      await handleAcceptInvitation(invitation);
    }
  };

  const handleClickDecline = async () => {
    if (invitation) {
      await handleDeclineInvitation(invitation.invitationID);
    }
  };

  if (!course) return <p>Course not found!</p>;
  else if (!instructor) return null;
  else if (
    coursePageLoading ||
    leaveLoading ||
    enrollLoading ||
    acceptLoading ||
    declineLoading
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
            <Button
              type="button"
              onClick={handleClickEnroll}
              className={`${!isEnrollable && "hidden"}`}
            >
              Enroll in the course
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleClickEnroll}
              className={`${!isEnrolled && "hidden"}`}
            >
              De-enroll from the course
            </Button>
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
