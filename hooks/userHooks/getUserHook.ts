import { useState, useEffect, useCallback } from "react";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";

const useGetUserHook = (userID: string, pass = false) => {
  const { state, getUser } = useUserContext();
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedUser = await getUser(userID);
      setUser(fetchedUser);
    } catch (error) {
      console.error(error);
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
