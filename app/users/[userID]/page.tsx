"use client";
import React, { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import useGetUserHook from "@/hooks/userHooks/getUserHook";
import { useUserContext } from "@/context/UserContext";
import UserCourses from "@/components/shared/UserCourses";
import MustLogin from "@/components/shared/MustLogin";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import InviteToCoursePanel from "@/components/shared/InviteToCoursePanel";

const ProfilePage = () => {
  const { state } = useUserContext();
  const { userID } = useParams<{ userID: string }>();
  const [showInvitePanel, setShowInvitePanel] = useState<boolean>(false);

  const { user, loading } = useGetUserHook(userID);

  const handleClosePanel = useCallback(() => {
    setShowInvitePanel(false);
  }, []);

  if (!state.user) return <MustLogin />;
  else if (loading) return <Loading />;
  else if (!user) return <p>User not found!</p>;

  const canInvite = (): boolean => {
    return state.user?.id !== user.id && user.role !== "instructor";
  };

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
      <div className={`${!canInvite() && "hidden"}`}>
        <Button onClick={() => setShowInvitePanel(true)}>
          Invite to a course
        </Button>
      </div>
      <div className={`${!showInvitePanel && "hidden"}`}>
        <InviteToCoursePanel user={user} onClose={handleClosePanel} />
      </div>
    </main>
  );
};

export default ProfilePage;
