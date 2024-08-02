import React from "react";
import UserFormComponent from "@/components/shared/FormFields/UserFormComponent";
import FormInput from "@/components/shared/FormFields/FormInput";
import Selector from "@/components/shared/FormFields/Selector";

const RegisterPage = () => {
  return (
    <UserFormComponent formType="signup">
      <FormInput name="name" type="signup" />
      <FormInput name="email" type="signup" />
      <Selector name="role" type="signup" />
      <FormInput name="password" type="signup" />
      <FormInput name="confirmPassword" type="signup" />
    </UserFormComponent>
  );
};

export default RegisterPage;
