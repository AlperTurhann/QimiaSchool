"use client";
import React, { cloneElement, ReactElement, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLoginHook from "@/hooks/userHooks/loginHook";
import useSignupHook from "@/hooks/userHooks/signupHook";
import { LoginProps, SignupProps } from "@/types/UserTypes";
import { LoginData, LoginSchema } from "@/utils/validations/LoginSchema";
import {
  RegisterData,
  RegisterSchema,
} from "@/utils/validations/RegisterSchema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Loading from "@/components/shared/Loading";

interface Props {
  formType: "login" | "register";
  children: ReactNode;
}

export const UserFormComponent = <T extends LoginData | RegisterData>({
  formType,
  children,
}: Props) => {
  const formSchema = formType === "login" ? LoginSchema : RegisterSchema;

  const form = useForm<T>({
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit, control } = form;

  const navigate = useRouter();
  const { login, loading: loginLoading } = useLoginHook();
  const { signup, loading: signupLoading } = useSignupHook();
  const onSubmit = async (data: FieldValues) => {
    if (formType === "login") login(data as LoginProps);
    else {
      const signupData: SignupProps = {
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
      };

      signup(signupData);
    }
  };
  const handleOtherWay = () => {
    if (formType === "login") navigate.push("/signup");
    else navigate.push("login");
  };

  if (loginLoading || signupLoading) return <Loading />;
  return (
    <div className="size-full flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center shadow-md rounded-xl gap-14 px-5 py-10 bg-white md:w-2/3 lg:w-1/2"
        >
          <h1 className="font-bold capitalize sm:text-lg md:text-xl lg:text-2xl">
            {formType === "login" ? "Login" : "Register"}
          </h1>
          <div className="w-full flex flex-col gap-y-7">
            {React.Children.map(children, (child) =>
              cloneElement(child as ReactElement<any>, { control })
            )}
          </div>
          <Button
            type="submit"
            className="w-full text-xs capitalize shadow-xl p-2 bg-sky-700 hover:bg-sky-600 sm:w-1/2 md:text-sm md:w-1/3 lg:text-base"
          >
            {formType === "login" ? "Login" : "Register"}
          </Button>
          <span className="text-xs md:text-sm">
            {formType === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Button
              type="button"
              variant="link"
              onClick={handleOtherWay}
              className="px-1 decoration-sky-500"
            >
              <span className="text-xs font-bold text-sky-500 md:text-sm">
                {formType === "login" ? "Register" : "Login"}
              </span>
            </Button>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default UserFormComponent;
