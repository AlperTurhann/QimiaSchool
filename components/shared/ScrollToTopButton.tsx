"use client";
import React, { useEffect, useState } from "react";
import { CircleArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  headerRef: React.RefObject<HTMLDivElement>;
}

const ScrollToTopButton = ({ headerRef }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerRect = headerRef.current?.getBoundingClientRect();
        if (headerRect.bottom <= 0) setIsVisible(true);
        else setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`z-50 fixed right-4 bottom-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Button
        variant="link"
        size="icon"
        onClick={scrollToTop}
        className="size-10 md:size-12"
      >
        <CircleArrowUp className="w-full h-full" />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
