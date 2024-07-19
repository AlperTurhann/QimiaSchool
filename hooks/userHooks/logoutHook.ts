import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useLogoutHook = () => {
  const { showAlert } = useAlertContext();
  const { dispatch, logout } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();

  const fetchLogout = useCallback(() => {
    try {
      setLoading(true);
      const fetchedLogout = logout();
      if ("data" in fetchedLogout) {
        if (fetchedLogout.data) {
          dispatch({ type: "CLEAR_USER" });
          showAlert("Success", fetchedLogout.message);
          navigate.push("/");
        } else {
          showAlert("Error", fetchedLogout.message);
        }
      } else {
        showAlert("Error", fetchedLogout.error);
      }
    } catch (error) {
      showAlert(
        "Error",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setLoading(false);
    }
  }, [logout]);

  return { logout: fetchLogout, loading };
};

export default useLogoutHook;
