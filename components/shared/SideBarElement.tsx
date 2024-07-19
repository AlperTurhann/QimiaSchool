"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  text: string;
  navLink: string;
}

const SideBarElement = ({ text, navLink }: Props) => {
  const navigate = useRouter();
  return (
    <li className="p-2">
      <Button
        variant="ghost"
        onClick={() => navigate.push(`${navLink}`)}
        className="size-full p-0 md:p-2"
      >
        <span className="text-xs">{text}</span>
      </Button>
    </li>
  );
};

export default SideBarElement;
