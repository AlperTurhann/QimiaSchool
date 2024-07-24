import { useState, useCallback } from "react";
import { SignupProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";
import { useRouter } from "next/navigation";

const useSignupHook = () => {
  const { showAlert } = useAlertContext();
  const { dispatch, signup } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();

  const fetchSignup = useCallback(
    async (signupData: SignupProps) => {
      try {
        setLoading(true);
        const fetchedSignup = await signup(signupData);
        if ("data" in fetchedSignup) {
          if (fetchedSignup.data) {
            dispatch({ type: "SET_USER", payload: fetchedSignup.data });
            showAlert("Success", fetchedSignup.message);
            navigate.push(`/users/${fetchedSignup.data.id}`);
          } else {
            showAlert("Error", fetchedSignup.message);
          }
        } else {
          showAlert("Error", fetchedSignup.error);
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
    [signup, showAlert]
  );

  return { signup: fetchSignup, loading };
};

export default useSignupHook;
