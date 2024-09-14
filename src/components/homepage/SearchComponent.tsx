"use client";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import useFetchResultLogic from "@/hooks/useFetchResult";
import ResponseMessage from "@/components/ResponseMessage";

const SearchComponent = () => {
  const {
    selectedTable,
    results,
    responseMessage,
    searchInputRef,
    fetchResults,
    handleTableSelect,
    renderSearchComponent,
  } = useFetchResultLogic();

  return (
    <section className="relative border-gray-600 border-t-2 ">
      <h2 className="mt-6 h-8">Search in Library</h2>
      <div className="flex h-20 justify-center p-4 text-gray-300 ">
        <select
          className="rounded-l px-1 py-[.65rem] bg-gray-800 cursor-pointer"
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

      <div className="min-h-screen">
        {selectedTable && results?.length > 0 && (
          <div className="border-t-2 mt-2">
            <Suspense fallback={<Loading />}>
              {renderSearchComponent()}
            </Suspense>
          </div>
        )}
        {responseMessage && <ResponseMessage message={responseMessage} />}
      </div>
    </section>
  );
};

export default SearchComponent;
