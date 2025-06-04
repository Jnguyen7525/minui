import React from "react";

type JumbotronProps = {
  backgroundImage: string;
  className?: string; // ✅ Custom styles for parent container
  overlayColor?: string; // ✅ Optional overlay color
  overlayOpacity?: string;
  children?: React.ReactNode; // ✅ Allows any content inside
};

const Jumbotron: React.FC<JumbotronProps> = ({
  backgroundImage,
  className = "",
  overlayColor = "", // ✅ Default semi-transparent dark overlay
  overlayOpacity = "",
  children,
}) => {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayColor} ${overlayOpacity}`} />

      {/* Content */}
      <div className="flex w-full h-full z-10">{children}</div>
    </div>
  );
};

export default Jumbotron;
