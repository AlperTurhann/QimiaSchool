"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const MustLogin = () => {
  const t = useTranslations("warnings.mustLogin");
  const navigate = useRouter();

  return (
    <div className="flex justify-center">
      <span className="text-sm font-bold text-gray-600 sm:text-lg md:text-xl lg:text-2xl">
        {t("text1")}{" "}
        <Button
          variant="link"
          onClick={() => navigate.push("/login")}
          className="h-auto text-sm font-bold p-0 text-blue-800 sm:text-lg md:text-xl lg:text-2xl"
        >
          {t("button")}
        </Button>{" "}
        {t("text2")}
      </span>
    </div>
  );
};

export default MustLogin;
