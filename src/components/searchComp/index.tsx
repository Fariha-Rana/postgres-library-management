import { lazy } from "react";

// Lazy load the components
export const SearchBooks = lazy(
  () => import("@/components/searchComp/SearchBooks")
);

export const SearchAuthors = lazy(
  () => import("@/components/searchComp/SearchAuthors")
);
export const SearchMembers = lazy(
  () => import("@/components/searchComp/SearchMember")
);

export const SearchTransactions = lazy(
  () => import("@/components/searchComp/SearchTransactions")
);
