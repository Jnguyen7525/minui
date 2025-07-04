import React from "react";

type AvatarProps = {
  src?: string; // Image URL
  alt?: string;
  name?: string; // User's name (for fallback)
  className?: string;
  size?: "sm" | "md" | "lg" | "xl"; // NEW: Size variants
};

const sizeStyles = {
  sm: "size-6 text-sm",
  md: "size-8 text-base",
  lg: "size-10 text-lg",
  xl: "size-12 text-xl",
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User Avatar",
  name = "",
  className,
  size = "md", // Default size
}) => {
  const fallbackLetter = name ? name.charAt(0).toUpperCase() : "?"; // Show first letter or "?"

  return (
    <div
      className={`relative flex shrink-0 overflow-hidden rounded-full hover:cursor-pointer ${sizeStyles[size]}  ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square size-full object-cover rounded-full"
        />
      ) : name ? (
        <div
          className={`flex size-full items-center justify-center font-bold `}
        >
          {fallbackLetter}
        </div>
      ) : (
        <div className={`flex size-full items-center justify-center`}>
          <svg
            aria-hidden="true"
            fill="none"
            height="80%"
            viewBox="0 0 24 24"
            width="80%"
          >
            <path d="M12 2C9.38 2 7.25 4.13..." fill="currentColor" />
            <path d="M17.0809 14.1489C14.2909 12.2889..." fill="currentColor" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Avatar;
