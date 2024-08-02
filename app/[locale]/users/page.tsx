import React from "react";
import { useTranslations } from "next-intl";
import { CheckInstructor } from "@/components/dynamic/CheckInstructor";
import UsersList from "@/components/dynamic/UsersList";

const Users = () => {
  const t = useTranslations("pages.users");

  return (
    <CheckInstructor>
      <main className="w-full h-full">
        <h1 className="text-center text-2xl font-bold p-5">{t("title")}</h1>
        <UsersList />
      </main>
    </CheckInstructor>
  );
};

export default Users;
