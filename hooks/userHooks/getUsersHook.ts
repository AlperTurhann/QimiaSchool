"use client";
import { useState, useEffect, useCallback } from "react";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useGetUsersHook = () => {
  const { showErrorAlert } = useAlertContext();
  const { getUsers } = useUserContext();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedUsers = await getUsers();
      if (typeof fetchedUsers !== "string") {
        setUsers(fetchedUsers.data ?? []);
      } else {
        showErrorAlert(fetchedUsers);
      }
    } catch (error) {
      showErrorAlert("transactionError");
    } finally {
      setLoading(false);
    }
  }, [getUsers, showErrorAlert]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading };
};

export default useGetUsersHook;
