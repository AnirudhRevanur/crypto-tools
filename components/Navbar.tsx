"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { title: "Home", route: "/" },
  { title: "Caesar", route: "/caesar" },
  { title: "Vigenere", route: "/vigenere" },
  { title: "Playfair", route: "/playfair" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#2b2b2b] shadow-md p-4 flex justify-center space-x-8">
      {routes.map(({ title, route }) => {
        const isActive = pathname === route;
        return (
          <Link
            key={route}
            href={route}
            className={`
              relative px-3 py-1 text-[#f5f5f5] font-medium
              hover:text-blue-500 transition-colors
              ${isActive ? "text-blue-600 font-bold" : ""}
            `}
          >
            {title}
            {/* Underline */}
            <span
              className={`
                absolute left-0 -bottom-1 w-full h-0.5
                bg-blue-500 transition-all
                ${isActive ? "scale-x-100" : "scale-x-0"}
                origin-left
              `}
            />
          </Link>
        );
      })}
    </nav>
  );
}
