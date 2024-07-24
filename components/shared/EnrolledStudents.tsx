"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import StudentCard from "@/modules/Student";
import MustLogin from "@/components/shared/MustLogin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  type: "view" | "edit";
  enrolledUsers: UserProps[];
  handleKickStudent?: (studentID: string) => void;
}

const EnrolledStudents = ({
  type,
  enrolledUsers,
  handleKickStudent = () => {},
}: Props) => {
  const { state } = useUserContext();
  const navigate = useRouter();

  const getGridClass = (): string => {
    if (type === "edit") return "grid-cols-1";
    if (enrolledUsers.length <= 1) return "grid-cols-1";
    if (enrolledUsers.length === 2) return "grid-cols-2";
    return "grid-cols-3";
  };

  return (
    <Card className={`shadow-md ${type === "edit" ? "w-full" : "w-2/3"}`}>
      <CardHeader className="text-center border-b">
        <CardTitle>Enrolled Students</CardTitle>
      </CardHeader>
      <CardContent className="text-center p-5">
        <div className={`${state.user && "hidden"}`}>
          <MustLogin />
        </div>
        <div className={`${!state.user && "hidden"}`}>
          <span
            className={`text-gray-500 ${
              enrolledUsers.length !== 0 && "hidden"
            }`}
          >
            There are no students enrolled in this course!
          </span>
          <div className={`flex flex-col gap-3 ${type === "view" && "hidden"}`}>
            {enrolledUsers.map((student) => (
              <StudentCard
                key={student.id}
                type="enrolled"
                student={student}
                handleKickStudent={() => handleKickStudent(student.id)}
              />
            ))}
          </div>
          <div
            className={`grid gap-3 ${getGridClass()} ${
              type === "edit" && "hidden"
            }`}
          >
            {enrolledUsers.map((student) => (
              <div key={student.id} className="size-full">
                <Button
                  variant="link"
                  onClick={() => navigate.push(`/users/${student.id}`)}
                  className="size-full"
                >
                  {student.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrolledStudents;
