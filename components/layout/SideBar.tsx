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
    setIsOpen(false);
  }, [state.user]);

  if (!state.user) return null;
  return (
    <div className="h-screen z-50 top-0 sticky">
      <Button
        variant="outline"
        onClick={toggleSideBar}
        className={`z-10 top-24 fixed p-2 ${isOpen && "hidden"}`}
      >
        <PanelLeftOpen className="size-8" />
      </Button>
      <aside
        className={`h-full z-50 absolute transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-800 text-white overflow-y-auto`}
        style={{ width: "13rem" }}
      >
        <div className="z-10 w-full flex justify-end px-2 sticky bg-gray-800">
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
              navLink={`/courses/${
                state.user.role === "instructor" ? "new" : ""
              }`}
            />
            <SideBarElement
              text={`${
                state.user.role === "instructor"
                  ? "Manage Courses"
                  : "My Courses"
              }`}
              navLink={`/courses/${
                state.user.role === "instructor" ? "manage" : "enrolled"
              }`}
            />
            <div className={`${state.user.role !== "instructor" && "hidden"}`}>
              <SideBarElement text="All Users" navLink={`/users`} />
            </div>
          </ul>
        </ScrollArea>
      </aside>
    </div>
  );
};

export default SideBar;
