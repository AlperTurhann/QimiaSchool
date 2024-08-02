"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Eye, User } from "lucide-react";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  invitation: InvitationProps;
  setInvitations: Dispatch<SetStateAction<InvitationProps[]>>;
}

const CourseInvitationCard = ({ invitation, setInvitations }: Props) => {
  const t = useTranslations("models.courseInvitation");
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
        <CardDescription className="capitalize">
          <Button
            variant="link"
            onClick={() => navigate.push(`/users/${user.id}`)}
            className="h-full p-0 text-gray-500"
          >
            <strong className="marginRight1">{t("inviter")}:</strong>
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
            onClick={() => handleAcceptCourseInvitation(invitation)}
          >
            {t("accept")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleDeclineCourseInvitation(invitation)}
          >
            {t("decline")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseInvitationCard;
