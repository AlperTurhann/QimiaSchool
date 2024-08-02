import React from "react";
import { useTranslations } from "next-intl";

const OnlyInstructor = () => {
  const t = useTranslations("warnings");

  return (
    <div className="flex justify-center">
      <span className="text-sm font-bold text-gray-600 sm:text-lg md:text-xl lg:text-2xl">
        {t("onlyInstructor")}
      </span>
    </div>
  );
};

export default OnlyInstructor;
