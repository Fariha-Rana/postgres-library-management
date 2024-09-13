"use client";
import { searchQueryFromDatabase } from "@/database/actions/search.actions";
import { useState, Suspense, useRef } from "react";
import {
  SearchBooks,
  SearchAuthors,
  SearchMembers,
  SearchTransactions,
} from "../searchComp";

const SearchDropdown = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const fetchResults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchText = searchInputRef.current?.value;
    console.log("Search Text:", searchText);
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
      setResults(response);
    } catch (error) {
      console.error("Error fetching search data", error);
      setResults([]);
    }
  };

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchText(e.target.value);
  // };

  const handleTableSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTable(e.target.value);
    setResults([]);
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

  return (
    <div className="relative border-gray-600 border-t-2 ">
      <h2 className="mt-6 h-8">Search in Library</h2>
      <div className="flex h-20 justify-center p-4 text-gray-300 ">
        <select
          className="rounded-l px-1 py-[.65rem] bg-gray-800"
          value={selectedTable || ""}
          onChange={handleTableSelect}
        >
          <option value="">Search for</option>
          <option value="books">Books</option>
          <option value="authors">Authors</option>
          <option value="members">Members</option>
          <option value="transactions">Transactions</option>
        </select>
        <form className="flex border" onSubmit={fetchResults}>
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search..."
            className="border min-w-full text-gray-800  px-4 py-2.5"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-r px-4 py-2 hover:opacity-70"
          >
            Search
          </button>
        </form>
      </div>

      {selectedTable && results.length > 0 && (
        <div className="border-t-2 mt-2 h-full">
          <Suspense
            fallback={
              <div className="p-4 h-10 bg-red-500 text-center text-white">
                Loading...
              </div>
            }
          >
            {renderSearchComponent()}
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
