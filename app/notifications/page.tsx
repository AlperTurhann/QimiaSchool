"use client";
import React from "react";
import { useUserContext } from "@/context/UserContext";
import MustLogin from "@/components/shared/MustLogin";
import CourseInvitationCard from "@/modules/CourseInvitation";
import useGetInvitationsHook from "@/hooks/invitationHooks/getInvitationsHook";
import Loading from "@/components/shared/Loading";
import JoinInvitationCard from "@/modules/JoinInvitation";

const NotificationsPage = () => {
  const { state } = useUserContext();

  const { invitations, setInvitations, loading } = useGetInvitationsHook();

  if (!state.user) return <MustLogin />;
  else if (loading) return <Loading />;
  return (
    <div className="size-full flex flex-col items-center mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Notifications</h1>
      <span className={`${invitations.length !== 0 && "hidden"}`}>
        You have no notification at the moment
      </span>
      {invitations.map((invitation) => (
        <div
          key={invitation.invitationID}
          className="size-full flex flex-col items-center gap-10"
        >
          <div
            className={`w-full flex flex-col items-center gap-5 ${
              state.user?.role === "instructor" && "hidden"
            }`}
          >
            <CourseInvitationCard
              invitation={invitation}
              setInvitations={setInvitations}
            />
          </div>
          <div
            className={`w-full flex flex-col items-center gap-5 ${
              state.user?.role === "student" && "hidden"
            }`}
          >
            <JoinInvitationCard
              invitation={invitation}
              setInvitations={setInvitations}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPage;
