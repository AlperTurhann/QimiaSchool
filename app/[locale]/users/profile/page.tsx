import React from "react";
import UserInfos from "@/components/dynamic/UserInfos";

const ProfilePage = () => {
  return (
    <main className="w-full h-full flex flex-col items-center gap-5">
      <UserInfos />
    </main>
  );
};

export default ProfilePage;
