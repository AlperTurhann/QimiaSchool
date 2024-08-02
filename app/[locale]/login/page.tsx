import React from "react";
import UserFormComponent from "@/components/shared/FormFields/UserFormComponent";
import FormInput from "@/components/shared/FormFields/FormInput";

const LoginPage = () => {
  return (
    <UserFormComponent formType="login">
      <FormInput name="email" type="login" />
      <FormInput name="password" type="login" />
    </UserFormComponent>
  );
};

export default LoginPage;
