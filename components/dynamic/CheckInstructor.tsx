"use client";
import React, { ReactNode } from "react";
import { useUserContext } from "@/context/UserContext";
import MustLogin from "@/components/shared/MustLogin";
import OnlyInstructor from "@/components/shared/OnlyInstructor";

interface Props {
  children: ReactNode;
}

const CheckInstructor = ({ children }: Props) => {
  const { state } = useUserContext();

  if (!state.user) return <MustLogin />;
  if (state.user.role !== "instructor") return <OnlyInstructor />;
  return <>{children}</>;
};

export { CheckInstructor };
