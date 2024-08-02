import { useTranslations } from "next-intl";
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
  const t = useTranslations("actions.student");

  if (courseState.isInvited) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Button type="button" onClick={() => handleInvitationAction(true)}>
          {t("acceptInvitation")}
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => handleInvitationAction(false)}
        >
          {t("declineInvitation")}
        </Button>
      </div>
    );
  }

  if (course.accessLevel === "everyone" || courseState.isEnrolled) {
    return (
      <Button
        type="button"
        variant={courseState.isEnrolled ? "destructive" : "default"}
        onClick={handleEnrollAction}
      >
        {courseState.isEnrolled ? t("deenrollCourse") : t("enrollCourse")}
      </Button>
    );
  }

  if (course.accessLevel === "acceptedOnly") {
    return (
      <Button
        type="button"
        variant={courseState.isApplied ? "destructive" : "default"}
        onClick={handleApplyAction}
      >
        {courseState.isApplied ? t("withdrawCourse") : t("applyCourse")}
      </Button>
    );
  }

  return null;
};

export { StudentActions };
