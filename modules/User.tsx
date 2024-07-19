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
    <Card key={user.id} className="w-full h-full overflow-hidden">
      <Button
        variant="ghost"
        onClick={() => navigate.push(`/users/${user.id}`)}
        className="w-full h-full flex flex-col items-start p-0"
      >
        <CardHeader className="w-full" style={{ textAlign: "start" }}>
          <CardTitle
            style={{
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            className="w-full"
          >
            {user.name}
          </CardTitle>
          <CardDescription className="capitalize">
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
