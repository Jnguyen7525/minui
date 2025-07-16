import React from "react";

type DrawerProps = {
  isOpen: boolean;
  placement?: "left" | "right" | "top" | "bottom";
  onClose: () => void;
  children: React.ReactNode;
  size?: { width?: string; height?: string };
  className?: string;
};

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  placement = "right",
  onClose,
  children,
  size,
  className,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed z-50 transition-transform duration-500 ${className} ${
          placement === "left"
            ? "top-0 left-0 -translate-x-full"
            : placement === "right"
            ? "top-0 right-0 translate-x-full"
            : placement === "top"
            ? "left-0 top-0 -translate-y-full"
            : "left-0 bottom-0 translate-y-full"
        } ${isOpen ? "!translate-x-0 !translate-y-0" : ""}`}
        style={{
          width:
            placement === "left" || placement === "right"
              ? size?.width || "fit"
              : "100%",
          height:
            placement === "top" || placement === "bottom"
              ? size?.height || "25%"
              : "100%",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Drawer;
