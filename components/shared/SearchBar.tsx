import React, { FormEvent, useEffect } from "react";
import { Search } from "lucide-react";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { useSearchContext } from "@/context/SearchContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchPanel from "@/components/shared/SearchPanel";

interface Props {
  values: CourseProps[] | UserProps[];
}

const SearchBar = ({ values }: Props) => {
  const { state, dispatch } = useSearchContext();

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
      const result = values.filter((value) =>
        value.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      dispatch({
        type: "SET_RESULTS",
        payload: result as CourseProps[] | UserProps[],
      });
    }
  };

  useEffect(() => {
    dispatch({ type: "SET_QUERY", payload: "" });
    dispatch({ type: "CLEAR_RESULTS" });
    dispatch({ type: "SEARCH" });
  }, values);

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
