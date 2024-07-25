"use client";
import React from "react";
import { useUserContext } from "@/context/UserContext";
import UserCourses from "@/components/shared/UserCourses";
import MustLogin from "@/components/shared/MustLogin";

const ProfilePage = () => {
  const { state } = useUserContext();

  if (!state.user) return <MustLogin />;
  return (
    <main className="w-full h-full flex flex-col items-center gap-5">
      <h1 className="text-2xl font-bold">{state.user.name}</h1>
      <span className="capitalize text-gray-500">
        <strong>Role: </strong>
        {state.user.role}
      </span>
      <p>
        <strong>Email: </strong>
        {state.user.email}
      </p>
      <UserCourses user={state.user} />
    </main>
  );
};

export default ProfilePage;
