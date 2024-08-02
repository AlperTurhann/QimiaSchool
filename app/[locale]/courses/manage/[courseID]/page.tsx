import React from "react";
import { CheckInstructor } from "@/components/dynamic/CheckInstructor";
import ManageCourse from "@/components/dynamic/ManageCourse";

const ManageCoursePage = () => {
  return (
    <CheckInstructor>
      <main className="w-full h-full flex flex-col items-center">
        <ManageCourse />
      </main>
    </CheckInstructor>
  );
};

export default ManageCoursePage;
