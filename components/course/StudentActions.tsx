import { CourseProps, CourseState } from "@/types/CourseTypes";
import { Button } from "@/components/ui/button";

interface Props {
  courseState: CourseState;
  course: CourseProps;
  handleEnrollAction: () => void;
  handleApplyAction: () => void;
  handleInvitationAction: (accept: boolean) => void;
}

const StudentActions = ({
  courseState,
  course,
  handleEnrollAction,
  handleApplyAction,
  handleInvitationAction,
}: Props) => {
  if (courseState.isInvited) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Button type="button" onClick={() => handleInvitationAction(true)}>
          Accept the invitation
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => handleInvitationAction(false)}
        >
          Decline the invitation
        </Button>
      </div>
    );
  }

  if (course.accessLevel === "everyone") {
    return (
      <Button
        type="button"
        variant={courseState.isEnrolled ? "destructive" : "default"}
        onClick={handleEnrollAction}
        className={`${
          !courseState.isEnrollable && !courseState.isEnrolled && "hidden"
        }`}
      >
        {courseState.isEnrolled ? "De-enroll from" : "Enroll in"} the course
      </Button>
    );
  }

  if (course.accessLevel === "accepted only") {
    return (
      <Button
        type="button"
        variant={courseState.isApplied ? "destructive" : "default"}
        onClick={handleApplyAction}
        className={`${
          !courseState.isEnrollable && !courseState.isApplied && "hidden"
        }`}
      >
        {courseState.isApplied ? "Withdraw from" : "Apply to"} the course
      </Button>
    );
  }

  return null;
};

export { StudentActions };
