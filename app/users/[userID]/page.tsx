"use client";
import React from "react";
import { useParams } from "next/navigation";
import useGetUserHook from "@/hooks/userHooks/getUserHook";
import { useUserContext } from "@/context/UserContext";
import UserCourses from "@/components/shared/UserCourses";
import MustLogin from "@/components/shared/MustLogin";
import Loading from "@/components/shared/Loading";

const ProfilePage = () => {
  const { state } = useUserContext();
  const { userID } = useParams<{ userID: string }>();

  const { user, loading } = useGetUserHook(userID);

  if (!state.user) return <MustLogin />;
  else if (loading) return <Loading />;
  else if (!user) return <p>User not found!</p>;
  return (
    <main className="w-full h-full flex flex-col items-center gap-5">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <span className="capitalize text-gray-500">
        <strong>Role: </strong>
        {user.role}
      </span>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
      <UserCourses user={user} />
    </main>
  );
};

export default ProfilePage;
