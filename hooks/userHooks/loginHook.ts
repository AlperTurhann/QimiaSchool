import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LoginProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useLoginHook = () => {
  const { showAlert } = useAlertContext();
  const { dispatch, login } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();

  const fetchLogin = useCallback(
    async (loginData: LoginProps) => {
      try {
        setLoading(true);
        const fetchedLogin = await login(loginData);
        if ("data" in fetchedLogin) {
          if (fetchedLogin.data) {
            dispatch({ type: "SET_USER", payload: fetchedLogin.data });
            showAlert("Success", fetchedLogin.message);
            navigate.push(`/users/${fetchedLogin.data.id}`);
          } else {
            showAlert("Error", fetchedLogin.message);
          }
        } else {
          showAlert("Error", fetchedLogin.error);
        }
      } catch (error) {
        showAlert(
          "Error",
          error instanceof Error ? error.message : String(error)
        );
      } finally {
        setLoading(false);
      }
    },
    [login, showAlert]
  );

  return { login: fetchLogin, loading };
};

export default useLoginHook;
