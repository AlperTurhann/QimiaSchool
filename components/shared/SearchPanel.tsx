"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { useSearchContext } from "@/context/SearchContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const SearchPanel = () => {
  const { state } = useSearchContext();
  const navigate = useRouter();

  const isCourse = (result: CourseProps | UserProps): result is CourseProps => {
    return "enrolledStudents" in result;
  };

  return (
    <ScrollArea
      className={`z-40 border bg-white ${state.query === "" && "hidden"}`}
    >
      <div className="max-h-64 divide-y-2 lg:max-h-[30rem]">
        {state.results.length > 0 ? (
          state.results.map((result) => (
            <Button
              type="button"
              key={result.id}
              variant="ghost"
              onClick={() =>
                navigate.push(
                  `/${isCourse(result) ? "courses" : "users"}/${result.id}`
                )
              }
              className="size-full rounded-none"
            >
              {result.name}
            </Button>
          ))
        ) : (
          <span className="text-sm px-2 text-gray-600">No results found</span>
        )}
      </div>
    </ScrollArea>
  );
};

export default SearchPanel;
