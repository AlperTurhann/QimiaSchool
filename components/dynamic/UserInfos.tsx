"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useUserContext } from "@/context/UserContext";
import UserCourses from "@/components/shared/UserCourses";
import MustLogin from "@/components/shared/MustLogin";

const UserInfos = () => {
  const { state } = useUserContext();
  const t = useTranslations("models.user");
  const rolesT = useTranslations("options.roles");

  if (!state.user) return <MustLogin />;
  return (
    <>
      <h1 className="text-2xl font-bold">{state.user.name}</h1>
      <span className="capitalize text-gray-500">
        <strong>{t("role")}: </strong>
        {rolesT(state.user.role)}
      </span>
      <p>
        <strong>{t("email")}: </strong>
        {state.user.email}
      </p>
      <UserCourses user={state.user} />
    </>
  );
};

export default UserInfos;
