"use client";
import React, { ReactNode } from "react";
import { useUserContext } from "@/context/UserContext";
import MustLogin from "@/components/shared/MustLogin";

interface Props {
  children: ReactNode;
}

const CheckUser = ({ children }: Props) => {
  const { state } = useUserContext();

  if (!state.user) return <MustLogin />;
  return <>{children}</>;
};

export default CheckUser;
