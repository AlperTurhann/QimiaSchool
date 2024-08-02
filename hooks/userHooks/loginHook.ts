"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LoginProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useLoginHook = () => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { dispatch, login } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();

  const fetchLogin = useCallback(
    async (loginData: LoginProps) => {
      try {
        setLoading(true);
        const fetchedLogin = await login(loginData);
        if (typeof fetchedLogin !== "string") {
          if (fetchedLogin.data) {
            dispatch({ type: "SET_USER", payload: fetchedLogin.data });
            showAlert(fetchedLogin.message);
            navigate.push("/users/profile");
          } else {
            showAlert(fetchedLogin.message);
          }
        } else {
          showErrorAlert(fetchedLogin);
        }
      } catch (error) {
        showErrorAlert("transactionError");
      } finally {
        setLoading(false);
      }
    },
    [login, showAlert, showErrorAlert]
  );

  return { login: fetchLogin, loading };
};

export default useLoginHook;
