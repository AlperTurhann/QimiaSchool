"use client";
import { useRouter } from "next/navigation";
import { User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProps } from "@/types/UserTypes";

interface Props {
  student: UserProps;
  handleKickStudent: () => void;
}

const StudentCard = ({ student, handleKickStudent }: Props) => {
  const navigate = useRouter();

  if (!student) return <p>User not found!</p>;
  return (
    <div
      key={student.id}
      className={`size-full relative border rounded-lg overflow-hidden ${
        !student && "hidden"
      }`}
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => navigate.push(`/users/${student.id}`)}
        className="z-10 absolute top-2 right-14"
      >
        <User size={20} />
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="icon"
        onClick={handleKickStudent}
        className="z-10 absolute top-2 right-2"
      >
        <X size={20} />
      </Button>
      <div className="studentContentDiv size-full flex flex-col text-sm p-2">
        <span className="truncateContent font-semibold">{student.name}</span>
        <span className="truncateContent">{student.email}</span>
      </div>
    </div>
  );
};

export default StudentCard;
