import React from "react";
import UserFormComponent from "@/components/shared/FormFields/UserFormComponent";
import FormInput from "@/components/shared/FormFields/FormInput";

const LoginPage = () => {
  return (
    <UserFormComponent formType="login">
      <FormInput name="email" label="Email" />
      <FormInput name="password" label="Password" />
    </UserFormComponent>
  );
};

export default LoginPage;
