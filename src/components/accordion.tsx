import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";

type AccordionProps = {
  children: React.ReactNode;
  className?: string;
};

const Accordion: React.FC<AccordionProps> = ({ children, className }) => {
  return (
    <div className={`rounded-md shadow-md   ${className}`}>{children}</div>
  );
};

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [open]);

  return (
    <div className={`border-b  ${className}`}>
      <button
        className={`flex justify-between w-full p-4 text-left text-sm font-medium rounded-md hover:opacity-70 transition-all hover:cursor-pointer `}
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDownIcon
          className={`size-4 transition-transform duration-200 ease-in-out ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        ref={contentRef}
        className={`overflow-hidden transition-[height] duration-200 ease-in-out `}
        style={{ height }}
      >
        <div className={`p-4 text-sm `}>{children}</div>
      </div>
    </div>
  );
};

export { Accordion, AccordionItem };
