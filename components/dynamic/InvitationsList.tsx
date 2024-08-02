"use client";
import React from "react";
import useGetInvitationsHook from "@/hooks/invitationHooks/getInvitationsHook";
import { useUserContext } from "@/context/UserContext";
import CourseInvitationCard from "@/modules/CourseInvitation";
import JoinInvitationCard from "@/modules/JoinInvitation";
import Loading from "@/components/shared/Loading";

interface Props {
  noFoundTranslation: string;
}

const InvitationsList = ({ noFoundTranslation }: Props) => {
  const { state } = useUserContext();

  const { invitations, setInvitations, loading } = useGetInvitationsHook();

  if (loading) return <Loading />;
  return (
    <>
      {invitations.length > 0 ? (
        <div className="size-full flex flex-col gap-5">
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
      ) : (
        <span className={`text-center ${invitations.length !== 0 && "hidden"}`}>
          {noFoundTranslation}
        </span>
      )}
    </>
  );
};

export default InvitationsList;
