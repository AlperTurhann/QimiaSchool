import { useState, useEffect, useCallback } from "react";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useGetUserHook = (userID: string, pass = false) => {
  const { showAlert } = useAlertContext();
  const { state, getUser } = useUserContext();
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedUser = await getUser(userID);
      if ("data" in fetchedUser) {
        setUser(fetchedUser.data);
      } else {
        showAlert("Error", fetchedUser.error);
      }
    } catch (error) {
      showAlert(
        "Error",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setLoading(false);
    }
  }, [getUser]);

  useEffect(() => {
    if (state.user || pass) fetchUser();
  }, [userID, fetchUser]);

  return { user, loading };
};

export default useGetUserHook;
