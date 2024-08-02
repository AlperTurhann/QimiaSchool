import React from "react";
import { useTranslations } from "next-intl";
import CheckUser from "@/components/dynamic/CheckUser";
import InvitationsList from "@/components/dynamic/InvitationsList";

const NotificationsPage = () => {
  const t = useTranslations("pages.notifications");

  return (
    <CheckUser>
      <div className="size-full flex flex-col items-center mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">{t("title")}</h1>
        <InvitationsList noFoundTranslation={t("noFound")} />
      </div>
    </CheckUser>
  );
};

export default NotificationsPage;
