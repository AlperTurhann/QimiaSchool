import React, { FormEvent } from "react";
import { Search } from "lucide-react";
import { useSearchContext } from "@/context/SearchContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchPanel from "@/components/shared/SearchPanel";
import Loading from "@/components/shared/Loading";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import useGetCoursesHook from "@/hooks/courseHooks/getCoursesHook";
import useGetUsersHook from "@/hooks/userHooks/getUsersHook";

interface Props {
  type: "courses" | "users";
}

const SearchBar = ({ type }: Props) => {
  const { state, dispatch } = useSearchContext();
  const { courses, loading: getCoursesLoading } = useGetCoursesHook();
  const { users, loading: getUsersLoading } = useGetUsersHook();

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    dispatch({ type: "SEARCH" });
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    dispatch({ type: "SET_QUERY", payload: event.target.value });
    if (event.target.value === "") dispatch({ type: "CLEAR_RESULTS" });
    else {
      let result: CourseProps[] | UserProps[] = [];
      if (type === "courses") {
        result = courses.filter((course) =>
          course.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
      } else
        result = users.filter((user) =>
          user.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
      dispatch({ type: "SET_RESULTS", payload: result });
    }
  };

  if (getCoursesLoading || getUsersLoading) return <Loading />;
  return (
    <div className="w-full flex justify-center">
      <form className="w-[95%] absolute sm:w-1/3 sm:right-5 sm:top-32">
        <Input type="text" value={state.query} onChange={handleInputChange} />
        <div className="absolute inset-y-0 right-0 text-gray-500">
          <Button
            type="submit"
            variant="link"
            size="icon"
            onClick={handleSearch}
          >
            <Search size={20} />
          </Button>
        </div>
        <div className="w-full absolute">
          <SearchPanel />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
