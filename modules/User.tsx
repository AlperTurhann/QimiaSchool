"use client";
import { useRouter } from "next/navigation";
import { UserProps } from "@/types/UserTypes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  user: UserProps;
}

const UserCard = ({ user }: Props) => {
  const navigate = useRouter();

  return (
    <Card className="size-full overflow-hidden">
      <Button
        variant="ghost"
        onClick={() => navigate.push(`/users/${user.id}`)}
        className="size-full flex flex-col items-start p-0"
      >
        <CardHeader className="w-full">
          <CardTitle className="truncateContent w-full">{user.name}</CardTitle>
          <CardDescription className="truncateContent capitalize">
            <strong>Role: </strong>
            {user.role}
          </CardDescription>
        </CardHeader>
        <CardContent className="truncateContent w-full">
          {user.email}
        </CardContent>
      </Button>
    </Card>
  );
};

export default UserCard;
