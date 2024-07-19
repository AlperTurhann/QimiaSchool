import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full h-32 flex flex-col justify-between items-center p-5 gap-5 bg-gray-700 text-white">
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/images/qimia-logo.svg"
          alt="Ciya Online Marketing"
          width={100}
          height={100}
          className="w-full"
        />
      </Link>
      <span className="text-[10px] font-bold leading-8 lg:sm">
        &#169; 2024 Copyrigt Qimia GmbH
      </span>
    </footer>
  );
};

export default Footer;
