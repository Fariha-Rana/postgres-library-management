"use client";
import { searchQueryFromDatabase } from "@/database/actions/search.actions";
import { useState, useRef } from "react";
import {
  SearchBooks,
  SearchAuthors,
  SearchMembers,
  SearchTransactions,
} from "@/components/searchComp";

const useFetchResultLogic = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [results, setResults] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const fetchResults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponseMessage("");
    const searchText = searchInputRef.current?.value;
    if (!searchText || !selectedTable) return;
    try {
      let response;
      if (selectedTable === "books") {
        response = await searchQueryFromDatabase("books", searchText);
      } else if (selectedTable === "authors") {
        response = await searchQueryFromDatabase("authors", searchText);
      } else if (selectedTable === "members") {
        response = await searchQueryFromDatabase("members", searchText);
      } else if (selectedTable === "transactions") {
        response = await searchQueryFromDatabase("transactions", searchText);
      }

      if (response?.rows?.length === 0 && response?.errorMessage === null) {
        setResponseMessage("results not found");
        setResults([]);
      } else if (response?.errorMessage !== null) {
        setResponseMessage(response?.errorMessage);
        setResults([]);
      } else {
        setResults(response?.rows);
      }
    } catch (error) {
      console.error("Error fetching search data", error);
      setResults([]);
    }
  };

  const handleTableSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTable(e.target.value);
    setResults([]);
    setResponseMessage("");
  };

  const renderSearchComponent = () => {
    switch (selectedTable) {
      case "books":
        return <SearchBooks books={results} />;
      case "authors":
        return <SearchAuthors authors={results} />;
      case "members":
        return <SearchMembers members={results} />;
      case "transactions":
        return <SearchTransactions transactions={results} />;
      default:
        return null;
    }
  };

  return {
    selectedTable,
    results,
    responseMessage,
    searchInputRef,
    fetchResults,
    handleTableSelect,
    renderSearchComponent,
  };
};

export default useFetchResultLogic;
