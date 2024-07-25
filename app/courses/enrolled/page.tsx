"use client";
import React from "react";
import { useUserContext } from "@/context/UserContext";
import MustLogin from "@/components/shared/MustLogin";
import UserCourses from "@/components/shared/UserCourses";

const EnrolledPage = () => {
  const { state } = useUserContext();

  if (!state.user) return <MustLogin />;
  return (
    <main className="w-full h-full flex flex-col items-center">
      <UserCourses user={state.user} />
    </main>
  );
};

export default EnrolledPage;
