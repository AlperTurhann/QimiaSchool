"use client";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Eye, User } from "lucide-react";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  invitation: InvitationProps;
  setInvitations: Dispatch<SetStateAction<InvitationProps[]>>;
}

const JoinInvitationCard = ({ invitation, setInvitations }: Props) => {
  const t = useTranslations("models.joinInvitation");
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
  if (!invitation || !user || !course) return null;
  return (
    <Card className="w-[95%] flex flex-col relative overflow-hidden md:w-2/3">
      <CardHeader className="marginTopUntilSm">
        <div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => navigate.push(`/courses/${course.id}`)}
            className="z-10 absolute top-2 right-14"
          >
            <Eye size={20} />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => navigate.push(`/users/${user.id}`)}
            className="z-10 absolute top-2 right-2"
          >
            <User size={20} />
          </Button>
        </div>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>
          <Button
            variant="link"
            onClick={() => navigate.push(`/users/${user.id}`)}
            className="h-full p-0 text-gray-500"
          >
            <strong className="marginRight1">{t("requestor")}: </strong>
            {user.name}
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-xs text-gray-700 sm:text-sm">
        <strong>{user.name}</strong> {t("inviteText1")}{" "}
        <strong>{course.name}</strong> {t("inviteText2")}
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="w-full grid grid-cols-2 gap-2 md:w-2/3">
          <Button
            type="button"
            onClick={() => handleAcceptJoinInvitation(invitation)}
          >
            {t("accept")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleDeclineJoinInvitation(invitation)}
          >
            {t("decline")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JoinInvitationCard;
