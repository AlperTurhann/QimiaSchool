"use client";
import React from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("components.appliedStudents");

  const renderContent = () => {
    if (!state.user) {
      return <MustLogin />;
    }

    if (appliedUsers.length === 0) {
      return <span className="text-gray-500">{t("noFound")}</span>;
    }

    return (
      <div className="flex flex-col gap-3">
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
    );
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="text-center border-b">
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="text-center p-5">{renderContent()}</CardContent>
    </Card>
  );
};

export default AppliedStudents;
