"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useLogoutHook = () => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { dispatch, logout } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();

  const fetchLogout = useCallback(() => {
    try {
      setLoading(true);
      const fetchedLogout = logout();
      if (typeof fetchedLogout !== "string") {
        if (fetchedLogout.data) {
          dispatch({ type: "CLEAR_USER" });
          showAlert(fetchedLogout.message);
          navigate.push("/");
        } else {
          showAlert(fetchedLogout.message);
        }
      } else {
        showErrorAlert(fetchedLogout);
      }
    } catch (error) {
      showErrorAlert("transactionError");
    } finally {
      setLoading(false);
    }
  }, [logout, showAlert, showErrorAlert]);

  return { logout: fetchLogout, loading };
};

export default useLogoutHook;
