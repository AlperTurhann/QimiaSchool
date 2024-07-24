import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Book, CircleUserRound, LogOut } from "lucide-react";
import useLogoutHook from "@/hooks/userHooks/logoutHook";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const { state } = useUserContext();
  const { logout } = useLogoutHook();
  const navigate = useRouter();

  const handleProfileClick = () => {
    if (state.user) navigate.push(`/users/${state.user.id}`);
    else navigate.push("/login");
  };

  return (
    <nav className="size-full flex items-center justify-between gap-5">
      <Link href="/">
        <Image
          src="/images/qimia-logo.svg"
          alt="Ciya Online Marketing"
          width={100}
          height={100}
          className="w-full"
        />
      </Link>
      <div className="flex items-center gap-0 sm:gap-2 md:gap-3">
        <Button
          variant="ghost"
          onClick={() => navigate.push("/notifications")}
          className={`relative p-2 ${!state.user && "hidden"}`}
        >
          <Bell size={25} />
          <span
            className={`size-2 top-0.5 right-0.5 block absolute rounded-full bg-red-500 ${
              state.user?.invitations.length === 0 && "hidden"
            }`}
          />
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate.push("/courses")}
          className="p-2"
        >
          <Book size={25} />
        </Button>
        <Button variant="ghost" onClick={handleProfileClick} className="p-2">
          <CircleUserRound size={25} />
        </Button>
        <Button
          variant="ghost"
          onClick={logout}
          className={`p-2 ${!state.user && "hidden"}`}
        >
          <LogOut size={25} />
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
