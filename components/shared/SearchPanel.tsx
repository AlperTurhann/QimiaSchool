"use client";
import React, { useEffect, useState } from "react";
import useGetCoursesHook from "@/hooks/courseHooks/getCoursesHook";
import useGetUsersHook from "@/hooks/userHooks/getUsersHook";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loading from "@/components/shared/Loading";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  type: "courses" | "users";
  query: string;
}

const SearchPanel = ({ type, query }: Props) => {
  const { courses, loading: getCoursesLoading } = useGetCoursesHook();
  const { users, loading: getUsersLoading } = useGetUsersHook();
  const [results, setResults] = useState<CourseProps[] | UserProps[]>([]);
  const navigate = useRouter();

  const handleSearch = async () => {
    let result: CourseProps[] | UserProps[] = [];
    if (type === "courses") {
      result = courses.filter((course) =>
        course.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      result = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (query !== "") setResults(result);
    else setResults([]);
  };

  useEffect(() => {
    handleSearch();
  }, [query, courses, users]);

  if (getCoursesLoading || getUsersLoading) return <Loading />;
  return (
    <ScrollArea className={`z-40 border bg-white ${query === "" && "hidden"}`}>
      <div className="max-h-64 divide-y-2 lg:max-h-[30rem]">
        {results.map((result) => (
          <Button
            type="button"
            key={result.id}
            variant="ghost"
            onClick={() => navigate.push(`${type}/${result.id}`)}
            className="size-full rounded-none"
          >
            {result.name}
          </Button>
        ))}
        <span
          className={`text-sm px-2 text-gray-600 ${
            results.length !== 0 && "hidden"
          }`}
        >
          No results found
        </span>
      </div>
    </ScrollArea>
  );
};

export default SearchPanel;
