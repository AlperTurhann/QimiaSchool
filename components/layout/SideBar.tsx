"use client";
import React, { useEffect, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useUserContext } from "@/context/UserContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import SideBarElement from "@/components/shared/SideBarElement";
import { Button } from "@/components/ui/button";

const SideBar = () => {
  const { state } = useUserContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSideBar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!state.user) setIsOpen(false);
  }, [state.user]);

  if (!state.user) return null;
  return (
    <div className="h-screen z-50 sticky top-0">
      <Button
        variant="outline"
        onClick={toggleSideBar}
        className={`fixed top-24 left-0 z-10 p-2 ${isOpen && "hidden"}`}
      >
        <PanelLeftOpen className="size-8" />
      </Button>
      <aside
        className={`h-full absolute top-0 left-0 transition-all duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-800 text-white overflow-y-auto`}
        style={{ width: "13rem" }}
      >
        <div className="w-full flex justify-end px-2 sticky top-0 bg-gray-800 z-10">
          <Button
            variant="ghost"
            onClick={toggleSideBar}
            className={`p-2 ${!isOpen && "hidden"}`}
          >
            <PanelLeftClose className="size-8" />
          </Button>
        </div>
        <ScrollArea className="w-full h-[calc(100vh-6rem)] p-5">
          <ul className="w-[95%] flex flex-col text-center text-xs divide-y-2 sm:text-sm">
            <SideBarElement
              text={`${
                state.user.role === "instructor"
                  ? "Add New Course"
                  : "Available Courses"
              }`}
              navLink={`${state.user.role === "instructor" ? "new" : ""}`}
            />
            <SideBarElement
              text={`${
                state.user.role === "instructor"
                  ? "Manage Courses"
                  : "My Courses"
              }`}
              navLink={`${
                state.user.role === "instructor" ? "manage" : "enrolled"
              }`}
            />
          </ul>
        </ScrollArea>
      </aside>
    </div>
  );
};

export default SideBar;
