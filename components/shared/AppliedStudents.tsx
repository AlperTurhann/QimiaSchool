"use client";
import React from "react";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import StudentCard from "@/modules/Student";
import MustLogin from "@/components/shared/MustLogin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  appliedUsers: UserProps[];
  handleAcceptStudent: (student: UserProps) => void;
  handleDeclineStudent: (studentID: string) => void;
}

const AppliedStudents = ({
  appliedUsers,
  handleAcceptStudent,
  handleDeclineStudent,
}: Props) => {
  const { state } = useUserContext();

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="text-center border-b">
        <CardTitle>Applied Students</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <span
          className={`text-center text-gray-500 p-6 ${
            appliedUsers.length === 0 && state.user ? "block" : "hidden "
          }`}
        >
          There are no students applied in this course!
        </span>
        <div className={`${state.user && "hidden"}`}>
          <MustLogin />
        </div>
        <div
          className={`${
            !state.user || (appliedUsers.length === 0 && "hidden")
          }`}
        >
          <div className="flex flex-col p-5 gap-3">
            {appliedUsers.map((student) => (
              <StudentCard
                key={student.id}
                type="applied"
                student={student}
                handleAcceptStudent={() => handleAcceptStudent(student)}
                handleDeclineStudent={() => handleDeclineStudent(student.id)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppliedStudents;
