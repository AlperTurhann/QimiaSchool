"use client";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import useGetInvitationHook from "@/hooks/invitationHooks/getInvitationHook";
import useAcceptJoinInvitationHook from "@/hooks/invitationHooks/acceptJoinInvitationHook";
import useDeclineJoinInvitationHook from "@/hooks/invitationHooks/declineJoinInvitationHook";
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

interface Props {
  invitation: InvitationProps;
  setInvitations: Dispatch<SetStateAction<InvitationProps[]>>;
}

const JoinInvitationCard = ({ invitation, setInvitations }: Props) => {
  const navigate = useRouter();

  const {
    user,
    course,
    loading: getInvitationLoading,
  } = useGetInvitationHook(invitation);
  const { handleAcceptJoinInvitation, loading: acceptJoinLoading } =
    useAcceptJoinInvitationHook(setInvitations);
  const { handleDeclineJoinInvitation, loading: declineJoinLoading } =
    useDeclineJoinInvitationHook(setInvitations);

  if (getInvitationLoading || acceptJoinLoading || declineJoinLoading)
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
            onClick={() => handleAcceptJoinInvitation(invitation)}
          >
            Accept
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleDeclineJoinInvitation(invitation)}
          >
            Decline
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JoinInvitationCard;
