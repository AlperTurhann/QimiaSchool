"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import useGetUserHook from "@/hooks/userHooks/getUserHook";
import { useUserContext } from "@/context/UserContext";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import InviteToCoursePanel from "@/components/shared/InviteToCoursePanel";
import CheckUser from "@/components/dynamic/CheckUser";
import UserCourses from "@/components/shared/UserCourses";
import MustLogin from "@/components/shared/MustLogin";

const OtherUserInfos = () => {
  const { state } = useUserContext();
  const { userID } = useParams<{ userID: string }>();
  const [showInvitePanel, setShowInvitePanel] = useState<boolean>(false);
  const t = useTranslations("models.user");
  const rolesT = useTranslations("options.roles");

  const { user, loading } = useGetUserHook(userID);

  if (!state.user) return <MustLogin />;
  if (loading) return <Loading />;
  if (!user) return <p>{t("noFound")}</p>;

  const canInvite = (): boolean => {
    return state.user?.id !== user.id && user.role !== "instructor";
  };
  return (
    <CheckUser>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <span className="capitalize text-gray-500">
        <strong>{t("role")}: </strong>
        {rolesT(user.role)}
      </span>
      <p>
        <strong>{t("email")}: </strong>
        {user.email}
      </p>
      <UserCourses user={user} />
      {canInvite() && (
        <>
          <Button onClick={() => setShowInvitePanel(true)}>
            {t("inviteCourse")}
          </Button>
          <div className={`${!showInvitePanel && "hidden"}`}>
            <InviteToCoursePanel
              user={user}
              onClose={() => setShowInvitePanel(false)}
            />
          </div>
        </>
      )}
    </CheckUser>
  );
};

export default OtherUserInfos;
