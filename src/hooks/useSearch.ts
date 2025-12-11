import { useState, useMemo } from "react";
import { filterBySearch } from "../utils/searchUtils";

export const useSearch = <T>(items: T[], searchFields: (keyof T)[]) => {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    return filterBySearch(items, query, searchFields);
  }, [items, query, searchFields]);

  const clearSearch = () => setQuery("");

  return {
    query,
    setQuery,
    clearSearch,
    filteredItems,
    hasQuery: query.trim().length > 0,
  };
};
