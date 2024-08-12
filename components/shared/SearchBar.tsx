"use client";
import React, { FormEvent, useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { useSearchContext } from "@/context/SearchContext";
import { useUserContext } from "@/context/UserContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchPanel from "@/components/shared/SearchPanel";

type SearchableItem = CourseProps | UserProps;

interface Props {
  items: SearchableItem[];
}

const SearchBar = ({ items }: Props) => {
  const { state: searchState, dispatch } = useSearchContext();
  const { state: userState } = useUserContext();
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const t = useTranslations("components.searchBar");

  const filterItems = useCallback(
    (query: string) => {
      return items.filter((item) =>
        "role" in item
          ? item.name.toLowerCase().includes(query.toLowerCase()) &&
            item.id !== userState.user?.id
          : item.name.toLowerCase().includes(query.toLowerCase())
      );
    },
    [items, userState.user?.id]
  );

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    if (searchState.query !== "") dispatch({ type: "SEARCH" });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query !== "") dispatch({ type: "SET_QUERY", payload: query });
    else dispatch({ type: "CLEAR_SEARCH" });
    setDebouncedQuery(query);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const result = filterItems(debouncedQuery);
      dispatch({
        type: "SET_RESULTS",
        payload: result as CourseProps[] | UserProps[],
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedQuery, dispatch, filterItems]);

  useEffect(() => {
    dispatch({ type: "CLEAR_RESULTS" });
  }, [items]);

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSearch}
        className="w-[95%] absolute sm:w-1/3 sm:right-5 sm:top-32"
      >
        <Input
          type="text"
          value={searchState.query}
          onChange={handleInputChange}
          placeholder={t("placeholder")}
          className="pr-10"
        />
        <Button
          type="submit"
          variant="link"
          size="icon"
          className="absolute inset-y-0 right-0 text-gray-500"
        >
          <Search size={20} />
        </Button>
        <SearchPanel />
      </form>
    </div>
  );
};

export default SearchBar;
