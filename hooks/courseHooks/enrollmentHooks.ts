import { Dispatch, SetStateAction } from "react";
import useLeaveCourseHook from "@/hooks/userHooks/leaveCourseHook";
import useEnrollCourseHook from "@/hooks/userHooks/enrollCourseHook";
import useDeleteCourseHook from "@/hooks/courseHooks/deleteCourseHook";
import useAcceptCourseInvitationHook from "@/hooks/invitationHooks/acceptCourseInvitationHook";
import useDeclineCourseInvitationHook from "@/hooks/invitationHooks/declineCourseInvitationHook";
import useApplyCourseHook from "@/hooks/userHooks/applyCourseHook";
import useWithdrawCourseHook from "@/hooks/userHooks/withdrawCourseHook";
import { UserProps } from "@/types/UserTypes";

const useEnrollmentHooks = (
  setEnrolledUsers: Dispatch<SetStateAction<UserProps[]>>
) => {
  const { handleEnrollCourse, loading: enrollLoading } =
    useEnrollCourseHook(setEnrolledUsers);
  const { handleLeaveCourse, loading: leaveLoading } =
    useLeaveCourseHook(setEnrolledUsers);
  const { handleApplyCourse, loading: applyLoading } = useApplyCourseHook();
  const { handleWithdrawCourse, loading: withdrawLoading } =
    useWithdrawCourseHook();
  const { handleDeleteCourse, loading: deleteLoading } = useDeleteCourseHook();
  const { handleAcceptCourseInvitation, loading: acceptCourseLoading } =
    useAcceptCourseInvitationHook(undefined, setEnrolledUsers);
  const { handleDeclineCourseInvitation, loading: declineCourseLoading } =
    useDeclineCourseInvitationHook();

  return {
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
  };
};

export default useEnrollmentHooks;
