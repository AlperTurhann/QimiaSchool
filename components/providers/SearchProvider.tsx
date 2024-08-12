"use client";
import React, { ReactNode, useMemo, useReducer } from "react";
import {
  SearchAction,
  SearchContext,
  SearchContextType,
  SearchState,
} from "@/context/SearchContext";

interface Props {
  children: ReactNode;
}

const searchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "CLEAR_SEARCH":
      return { ...state, query: "", results: [] };
    case "CLEAR_RESULTS":
      return { ...state, query: "", results: [], finalResults: [] };
    case "SEARCH":
      return { ...state, finalResults: state.results };
  }
};

const SearchProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(searchReducer, {
    query: "",
    results: [],
    finalResults: [],
  });

  const value = useMemo<SearchContextType>(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
