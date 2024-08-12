"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SignupProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useAlertContext } from "@/context/AlertContext";

const useSignupHook = () => {
  const { showAlert, showErrorAlert } = useAlertContext();
  const { dispatch, signup } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();

  const fetchSignup = useCallback(
    async (signupData: SignupProps) => {
      try {
        setLoading(true);
        const fetchedSignup = await signup(signupData);
        if (typeof fetchedSignup !== "string") {
          if (fetchedSignup.data) {
            dispatch({ type: "SET_USER", payload: fetchedSignup.data });
            showAlert(fetchedSignup.message);
            navigate.push("/users/profile");
          } else {
            showAlert(fetchedSignup.message);
          }
        } else {
          showErrorAlert(fetchedSignup);
        }
      } catch (error) {
        showErrorAlert("transactionError");
      } finally {
        setLoading(false);
      }
    },
    [signup, showAlert, showErrorAlert]
  );

  return { signup: fetchSignup, loading };
};

export default useSignupHook;
