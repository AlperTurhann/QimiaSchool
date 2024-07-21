"use client";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import useGetInvitationHook from "@/hooks/invitationHooks/getInvitationHook";
import useAcceptInvitationHook from "@/hooks/invitationHooks/acceptInvitationHook";
import useDeclineInvitationHook from "@/hooks/invitationHooks/declineInvitationHook";
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

const InvitationCard = ({ invitation, setInvitations }: Props) => {
  const navigate = useRouter();

  const {
    inviter,
    invitedCourse,
    loading: getInvitationLoading,
  } = useGetInvitationHook(invitation);
  const { handleAcceptInvitation, loading: acceptLoading } =
    useAcceptInvitationHook(setInvitations);
  const { handleDeclineInvitation, loading: declineLoading } =
    useDeclineInvitationHook(setInvitations);

  if (getInvitationLoading || acceptLoading || declineLoading)
    return <Loading />;
  else if (!invitation || !inviter || !invitedCourse) return null;
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
          onClick={() => navigate.push(`/courses/${invitedCourse.id}`)}
          className="z-10 absolute top-2 right-2"
        >
          <Eye size={20} />
        </Button>
        <CardTitle>{invitedCourse.name}</CardTitle>
        <CardDescription className="capitalize">
          <strong>Inviting: </strong>
          {inviter.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="w-full grid grid-cols-2 gap-2 md:w-2/3">
          <Button
            type="button"
            onClick={() => handleAcceptInvitation(invitation)}
          >
            Accept
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleDeclineInvitation(invitation.invitationID)}
          >
            Decline
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitationCard;
