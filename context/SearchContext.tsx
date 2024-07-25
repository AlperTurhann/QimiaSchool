import { createContext, Dispatch, useContext } from "react";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";

type SearchAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_RESULTS"; payload: CourseProps[] | UserProps[] }
  | { type: "CLEAR_RESULTS" }
  | { type: "SEARCH" };

type SearchState = {
  query: string;
  results: CourseProps[] | UserProps[];
  finalResults: CourseProps[] | UserProps[];
};

type SearchContextType = {
  state: SearchState;
  dispatch: Dispatch<SearchAction>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

export { SearchContext, useSearchContext };
export type { SearchAction, SearchState, SearchContextType };
