"use client";
import { useRouter } from "next/navigation";
import { Check, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProps } from "@/types/UserTypes";

interface Props {
  type: "applied" | "enrolled";
  student: UserProps;
  handleKickStudent?: () => void;
  handleAcceptStudent?: () => void;
  handleDeclineStudent?: () => void;
}

const StudentCard = ({
  type,
  student,
  handleKickStudent,
  handleAcceptStudent,
  handleDeclineStudent,
}: Props) => {
  const navigate = useRouter();

  if (!student) return <p>User not found!</p>;
  return (
    <div
      className={`size-full relative border rounded-lg overflow-hidden ${
        !student && "hidden"
      }`}
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => navigate.push(`/users/${student.id}`)}
        className={`z-10 absolute top-2 ${
          type === "applied" ? "rightThirdAbsoluteButton" : "right-14"
        }`}
      >
        <User size={20} />
      </Button>
      {type === "enrolled" ? (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={handleKickStudent}
          className="z-10 absolute top-2 right-2"
        >
          <X size={20} />
        </Button>
      ) : (
        <>
          <Button
            type="button"
            size="icon"
            onClick={handleAcceptStudent}
            className="z-10 absolute top-2 right-14"
          >
            <Check size={20} />
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={handleDeclineStudent}
            className="z-10 absolute top-2 right-2"
          >
            <X size={20} />
          </Button>
        </>
      )}
      <div className="marginTopUntilSm size-full flex flex-col text-sm p-2">
        <span className="truncateContent font-semibold">{student.name}</span>
        <span className="truncateContent">{student.email}</span>
      </div>
    </div>
  );
};

export default StudentCard;
