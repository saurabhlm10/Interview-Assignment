'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const pathname = usePathname();

  return (
    <div className="border-b-2 border-white flex px-8 py-4 justify-between">
      <h1 className="text-2xl">Admin Dashboard</h1>
      {pathname === "/" ? (
        <Link
          href="/create"
          className="justify-self-end	 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
        >
          Create User
        </Link>
      ) : (
        <Link
          href="/"
          className="justify-self-end	 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
        >
          Home
        </Link>
      )}
    </div>
  );
};

export default Navbar;
