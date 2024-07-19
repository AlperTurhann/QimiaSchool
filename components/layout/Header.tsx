"use client";
import React, { useRef } from "react";
import NavBar from "@/components/layout/NavBar";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <header
        ref={headerRef}
        className="w-full h-24 bg-gradient-to-r from-blue-300 to-blue-600"
      >
        <div className="w-full h-20 p-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white">
          <NavBar />
        </div>
      </header>
      <ScrollToTopButton headerRef={headerRef} />
    </>
  );
};

export default Header;
