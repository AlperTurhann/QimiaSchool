"use client";
import { ReactNode, useCallback, useMemo, useState } from "react";
import {
  AlertContext,
  AlertContextType,
  AlertInfo,
} from "@/context/AlertContext";
import { useTranslations } from "next-intl";

interface Props {
  children: ReactNode;
}

const AlertProvider = ({ children }: Props) => {
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);
  const t = useTranslations("components.alert");
  const apiT = useTranslations("api");

  const hideAlert = useCallback(() => {
    setAlertInfo(null);
  }, []);

  const showAlert = useCallback(
    (descriptionT: APISuccessKeys) => {
      setAlertInfo({
        title: t("successTitle"),
        description: apiT(`success.${descriptionT}`),
      });
      setTimeout(() => {
        hideAlert();
      }, 5000);
    },
    [hideAlert]
  );

  const showErrorAlert = useCallback(
    (descriptionT: APIErrorsKeys) => {
      setAlertInfo({
        title: t("errorTitle"),
        description: apiT(`errors.${descriptionT}`),
      });
      setTimeout(() => {
        hideAlert();
      }, 5000);
    },
    [hideAlert]
  );

  const value = useMemo<AlertContextType>(
    () => ({
      showAlert,
      showErrorAlert,
      hideAlert,
      alertInfo,
    }),
    [showAlert, showErrorAlert, hideAlert, alertInfo]
  );

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

export default AlertProvider;
