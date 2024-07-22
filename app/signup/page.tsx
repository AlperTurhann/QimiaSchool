import React from "react";
import UserFormComponent from "@/components/shared/FormFields/UserFormComponent";
import FormInput from "@/components/shared/FormFields/FormInput";
import Selector from "@/components/shared/FormFields/Selector";

const RegisterPage = () => {
  return (
    <UserFormComponent formType="register">
      <FormInput name="name" label="Name" />
      <FormInput name="email" label="Email" />
      <Selector name="role" placeholder="Select a role" />
      <FormInput name="password" label="Password" />
      <FormInput name="confirmPassword" label="Confirm Password" />
    </UserFormComponent>
  );
};

export default RegisterPage;
