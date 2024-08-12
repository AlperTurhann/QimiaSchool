import React from "react";
import UserCourses from "@/components/shared/UserCourses";
import CheckUser from "@/components/dynamic/CheckUser";

const EnrolledPage = () => {
  return (
    <CheckUser>
      <main className="size-full flex flex-col items-center">
        <UserCourses />
      </main>
    </CheckUser>
  );
};

export default EnrolledPage;
