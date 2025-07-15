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
