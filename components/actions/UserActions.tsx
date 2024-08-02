import { CourseProps, CourseState } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { StudentActions } from "@/components/actions/StudentActions";
import { InstructorActions } from "@/components/actions/InstructorActions";

interface Props {
  userRole: string;
  courseState: CourseState;
  course: CourseProps;
  instructor: UserProps;
  handleEnrollAction: () => void;
  handleApplyAction: () => void;
  handleDeleteAction: () => void;
  handleInvitationAction: (accept: boolean) => void;
  userId: string;
}

const UserActions = ({
  userRole,
  courseState,
  course,
  instructor,
  handleEnrollAction,
  handleApplyAction,
  handleDeleteAction,
  handleInvitationAction,
  userId,
}: Props) => {
  if (userRole === "student") {
    return (
      <StudentActions
        courseState={courseState}
        course={course}
        handleEnrollAction={handleEnrollAction}
        handleApplyAction={handleApplyAction}
        handleInvitationAction={handleInvitationAction}
      />
    );
  }

  if (instructor.id === userId) {
    return <InstructorActions handleDeleteAction={handleDeleteAction} />;
  }

  return null;
};

export { UserActions };
