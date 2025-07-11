import React from "react";

type JumbotronProps = {
  backgroundImage: string;
  className?: string; // ✅ Custom styles for parent container
  children?: React.ReactNode; // ✅ Allows any content inside
};

const Jumbotron: React.FC<JumbotronProps> = ({
  backgroundImage,
  className = "",
  children,
}) => {
  return (
    <div
      className={`relative w-full h-full `}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${className} `} />

      {/* Content */}
      <div className="flex w-full h-full z-10">{children}</div>
    </div>
  );
};

export default Jumbotron;
