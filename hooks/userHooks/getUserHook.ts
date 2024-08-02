"use client";
import { useState, useEffect, useCallback } from "react";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useGetUserHook = (userID: string, pass = false) => {
  const { showErrorAlert } = useAlertContext();
  const { state, getUser } = useUserContext();
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedUser = await getUser(userID);
      if (typeof fetchedUser !== "string") {
        setUser(fetchedUser.data);
      } else {
        showErrorAlert(fetchedUser);
      }
    } catch (error) {
      showErrorAlert("transactionError");
    } finally {
      setLoading(false);
    }
  }, [getUser, showErrorAlert]);

  useEffect(() => {
    if (state.user || pass) fetchUser();
  }, [state.user, pass, userID, fetchUser]);

  return { user, loading };
};

export default useGetUserHook;
