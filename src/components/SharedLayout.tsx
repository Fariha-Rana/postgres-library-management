"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/authors", label: "Authors" },
  { href: "/books", label: "Books" },
  { href: "/members", label: "Members" },
  { href: "/transactions", label: "Transactions" },
];

function SharedLayout() {
  const pathname = usePathname();
  return (
    <>
      {/* searchbar */}
      <nav className="text-center text-gray-200 bg-gray-700 fixed top-20 left-0 h-screen w-60 ">
        <ul className="flex flex-col font-serif gap-8 p-8">
          {links.map(({ href, label }) => (
            <Link
              href={href}
              key={label}
              className={`border-b-2 text-lg px-2 py-3 rounded-md hover:bg-gray-600 ${
                pathname === href ? "bg-gray-800" : ""
              }`}
            >
              <li>{label}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default SharedLayout;
