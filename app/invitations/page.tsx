"use client";
import React from "react";
import { useUserContext } from "@/context/UserContext";
import MustLogin from "@/components/shared/MustLogin";
import InvitationCard from "@/modules/Invitation";
import useGetInvitationsHook from "@/hooks/invitationHooks/getInvitationsHook";
import Loading from "@/components/shared/Loading";

const InvitationsPage = () => {
  const { state } = useUserContext();

  const { invitations, setInvitations, loading } = useGetInvitationsHook();

  if (!state.user) return <MustLogin />;
  else if (loading) return <Loading />;
  return (
    <div className="size-full flex flex-col items-center mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Invitations</h1>
      <span className={`${invitations.length !== 0 && "hidden"}`}>
        You have no invitations at the moment
      </span>
      <div className="size-full flex flex-col items-center gap-5">
        {invitations.map((invitation) => (
          <InvitationCard
            key={invitation.invitationID}
            invitation={invitation}
            setInvitations={setInvitations}
          />
        ))}
      </div>
    </div>
  );
};

export default InvitationsPage;
