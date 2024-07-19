"use client";
import React from "react";
import { AlertCircle } from "lucide-react";
import { useAlertContext } from "@/context/AlertContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AlertRB = () => {
  const { alertInfo } = useAlertContext();

  if (!alertInfo) return null;
  return (
    <Alert
      variant={`${alertInfo.title === "Error" ? "destructive" : "default"}`}
      className="w-[95%] z-50 fixed bottom-3 right-3 bg-gray-100 sm:w-1/2 md:w-1/3 lg:w-1/4"
    >
      <AlertCircle className="size-4" />
      <AlertTitle>{alertInfo.title}</AlertTitle>
      <AlertDescription className="text-xs lg:text-sm">
        {alertInfo.description}
      </AlertDescription>
    </Alert>
  );
};

export default AlertRB;
