// import React, { useState, useEffect } from "react";
// import { ArrowUp } from "lucide-react"; // Default Lucide icon

// type BackToTopProps = {
//   icon?: React.ReactNode; // ✅ Allows custom icons or text
//   bgColor?: string;
//   textColor?: string;
//   position?: string;
//   className?: string;
// };

// const BackToTop: React.FC<BackToTopProps> = ({
//   icon = <ArrowUp className="w-5 h-5" />, // Default to Lucide ArrowUp
//   bgColor = "",
//   textColor = "",
//   position = "",
//   className = "bg-blue-500 not-first:text-white bottom-5 right-5 p-3 rounded-full shadow-md transition duration-150 ease-in-out hover:cursor-pointer hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none active:bg-red-800 absolute z-50",
// }) => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsVisible(window.scrollY > 300); // Show button when scrolling down
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <button
//       className={`fixed ${className} ${position} ${bgColor} ${textColor}  ${
//         isVisible ? "block" : "hidden"
//       }`}
//       onClick={scrollToTop}
//     >
//       {icon} {/* ✅ Custom icon or text */}
//     </button>
//   );
// };

// export default BackToTop;

// import React, { useState, useEffect, useRef } from "react";
// import { ArrowUp } from "lucide-react";

// type BackToTopProps = {
//   icon?: React.ReactNode;
//   className?: string;
// };

// const BackToTop: React.FC<BackToTopProps> = ({
//   icon = <ArrowUp className="w-5 h-5" />,
//   className,
// }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const containerRef = useRef<HTMLElement | null>(null);

//   useEffect(() => {
//     // Find the scrollable container closest to the button
//     containerRef.current = document.querySelector(
//       "main.overflow-y-auto"
//     ) as HTMLElement;
//     if (!containerRef.current) return;

//     const container = containerRef.current;

//     const handleScroll = () => {
//       setIsVisible(container.scrollTop > window.innerHeight);
//     };

//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <button
//       className={`fixed bottom-5 right-5 p-3 rounded-full shadow-md transition duration-150 ease-in-out   z-50" ${className}  ${
//         isVisible ? "block" : "hidden"
//       }`}
//       onClick={scrollToTop}
//     >
//       {icon}
//     </button>
//   );
// };

// export default BackToTop;

import React, { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";

// Find the nearest scrollable parent
function getScrollableParent(el: HTMLElement | null): HTMLElement {
  while (el) {
    const style = window.getComputedStyle(el);
    const overflowY = style.overflowY;
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight
    ) {
      return el;
    }
    el = el.parentElement;
  }
  return document.documentElement;
}

type BackToTopProps = {
  icon?: React.ReactNode;
  className?: string;
};

const BackToTop: React.FC<BackToTopProps> = ({
  icon = <ArrowUp className="w-5 h-5" />,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollTargetRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const parent = getScrollableParent(buttonRef.current.parentElement);
    scrollTargetRef.current = parent;

    const handleScroll = () => {
      const scrollTop =
        parent === document.documentElement ? window.scrollY : parent.scrollTop;

      // setIsVisible(scrollTop > window.innerHeight);
      setIsVisible(
        scrollTop > 100 // use container height instead of viewport
      );
    };

    parent.addEventListener("scroll", handleScroll);
    return () => parent.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    scrollTargetRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={buttonRef}
      className={`absolute bottom-5 right-5 p-3 rounded-full shadow-md z-50 transition duration-150 ease-in-out ${
        isVisible ? "block" : "hidden"
      } ${className}`}
      onClick={scrollToTop}
    >
      {icon}
    </button>
  );
};

export default BackToTop;
