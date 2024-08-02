import React from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { UserProps } from "@/types/UserTypes";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckInstructor } from "@/components/dynamic/CheckInstructor";
import InviteableCoursesList from "@/components/dynamic/InviteableCoursesList";

interface Props {
  user: UserProps;
  onClose: () => void;
}

const InviteToCoursePanel = ({ user, onClose }: Props) => {
  const t = useTranslations("components.inviteCoursePanel");

  return (
    <CheckInstructor>
      <div className="z-50 inset-0 fixed flex items-center justify-center bg-opacity-50 bg-black">
        <Button
          onClick={onClose}
          variant="link"
          className="size-full inset-0 absolute cursor-default bg-opacity-50 bg-black"
          aria-label="Close invite panel"
        />
        <Card className="w-[95%] max-w-md relative rounded-lg shadow-xl bg-white">
          <CardHeader>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="top-2 right-2 absolute text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </Button>
            <CardTitle>{t("title")}</CardTitle>
          </CardHeader>
          <InviteableCoursesList user={user} onClose={onClose} />
        </Card>
      </div>
    </CheckInstructor>
  );
};

export default InviteToCoursePanel;
