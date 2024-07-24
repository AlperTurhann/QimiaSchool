"use client";
import { ReactNode, useCallback, useMemo, useState } from "react";
import {
  AlertContext,
  AlertContextType,
  AlertInfo,
} from "@/context/AlertContext";

interface Props {
  children: ReactNode;
}

const AlertProvider = ({ children }: Props) => {
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  const hideAlert = useCallback(() => {
    setAlertInfo(null);
  }, []);

  const showAlert = useCallback(
    (title: string, description: string) => {
      setAlertInfo({ title, description });
      setTimeout(() => {
        hideAlert();
      }, 5000);
    },
    [hideAlert]
  );

  const value = useMemo<AlertContextType>(
    () => ({
      showAlert,
      hideAlert,
      alertInfo,
    }),
    [showAlert, hideAlert, alertInfo]
  );

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

export default AlertProvider;
