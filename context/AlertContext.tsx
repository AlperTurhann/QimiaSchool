import { createContext, useContext } from "react";

interface AlertInfo {
  title: string;
  description: string;
}

type AlertContextType = {
  showAlert: (description: APISuccessKeys) => void;
  showErrorAlert: (description: APIErrorsKeys) => void;
  hideAlert: () => void;
  alertInfo: AlertInfo | null;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlertContext must be used within an AlertProvider");
  }
  return context;
};

export { AlertContext, useAlertContext };
export type { AlertInfo, AlertContextType };
