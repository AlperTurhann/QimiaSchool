import React from "react";
import { useTranslations } from "next-intl";

const Loading = () => {
  const t = useTranslations("warnings");
  return <p>{t("loading")}</p>;
};

export default Loading;
