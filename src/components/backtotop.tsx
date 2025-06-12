import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // Default Lucide icon

type BackToTopProps = {
  icon?: React.ReactNode; // ✅ Allows custom icons or text
  bgColor?: string;
  textColor?: string;
  position?: string;
  className?: string;
};

const BackToTop: React.FC<BackToTopProps> = ({
  icon = <ArrowUp className="w-5 h-5" />, // Default to Lucide ArrowUp
  bgColor = "",
  textColor = "",
  position = "",
  className = "bg-blue-500 not-first:text-white bottom-5 right-5 p-3 rounded-full shadow-md transition duration-150 ease-in-out hover:cursor-pointer hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none active:bg-red-800",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300); // Show button when scrolling down
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`fixed ${className} ${position} ${bgColor} ${textColor}  ${
        isVisible ? "block" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      {icon} {/* ✅ Custom icon or text */}
    </button>
  );
};

export default BackToTop;
