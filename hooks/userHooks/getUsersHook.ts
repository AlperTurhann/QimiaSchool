import { useState, useEffect, useCallback } from "react";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useGetUsersHook = () => {
  const { showAlert } = useAlertContext();
  const { getUsers } = useUserContext();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedUsers = await getUsers();
      if ("data" in fetchedUsers) {
        setUsers(fetchedUsers.data ?? []);
      } else {
        showAlert("Error", fetchedUsers.error);
      }
    } catch (error) {
      showAlert(
        "Error",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setLoading(false);
    }
  }, [getUsers, showAlert]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading };
};

export default useGetUsersHook;
