"use client";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import useGetInvitationHook from "@/hooks/invitationHooks/getInvitationHook";
import useAcceptCourseInvitationHook from "@/hooks/invitationHooks/acceptCourseInvitationHook";
import useDeclineCourseInvitationHook from "@/hooks/invitationHooks/declineCourseInvitationHook";
import { InvitationProps } from "@/types/InvitationTypes";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";

interface Props {
  invitation: InvitationProps;
  setInvitations: Dispatch<SetStateAction<InvitationProps[]>>;
}

const CourseInvitationCard = ({ invitation, setInvitations }: Props) => {
  const navigate = useRouter();

  const {
    user,
    course,
    loading: getInvitationLoading,
  } = useGetInvitationHook(invitation);
  const { handleAcceptCourseInvitation, loading: acceptLoading } =
    useAcceptCourseInvitationHook(setInvitations);
  const { handleDeclineCourseInvitation, loading: declineLoading } =
    useDeclineCourseInvitationHook(setInvitations);

  if (getInvitationLoading || acceptLoading || declineLoading)
    return <Loading />;
  else if (!invitation || !user || !course) return null;
  return (
    <Card
      key={invitation.invitationID}
      className="w-[95%] flex flex-col relative overflow-hidden md:w-2/3"
    >
      <CardHeader>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => navigate.push(`/courses/${course.id}`)}
          className="z-10 absolute top-2 right-2"
        >
          <Eye size={20} />
        </Button>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription className="capitalize">
          <strong>Inviting: </strong>
          {user.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="w-full grid grid-cols-2 gap-2 md:w-2/3">
          <Button
            type="button"
            onClick={() => handleAcceptCourseInvitation(invitation)}
          >
            Accept
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleDeclineCourseInvitation(invitation)}
          >
            Decline
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseInvitationCard;
