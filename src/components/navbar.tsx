import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type NavbarItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  submenu?: { label: string; href: string }[];
};

type NavbarProps = {
  items: NavbarItem[];
  logo?: React.ReactNode;
  className?: string;
  navbarItemClassName?: string;
  submenuClassName?: string;
  subMenuItemClassName?: string;
};

const Navbar: React.FC<NavbarProps> = ({
  items,
  className,
  navbarItemClassName,
  submenuClassName,
  subMenuItemClassName,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav className={`flex items-center justify-between  `}>
      {/* ✅ Navbar Items */}
      <ul className={`flex ${className}`}>
        {items.map(({ label, href, icon, submenu }) => (
          <li key={label} className="relative group">
            {submenu ? (
              <button
                onClick={() => handleDropdownToggle(label)}
                onMouseEnter={() => setOpenDropdown(label)} // ✅ Open submenu on hover
                onMouseLeave={() => setOpenDropdown(null)} // ✅ Close submenu when leaving
                className={`flex items-center gap-2 hover:cursor-pointer ${navbarItemClassName}`}
              >
                {icon} {label}{" "}
                <ChevronDown
                  size={16}
                  className={`${
                    openDropdown &&
                    "rotate-180 transition-all duration-300 ease-in-out "
                  }`}
                />
              </button>
            ) : (
              <a
                href={href ?? "#"}
                className={`flex items-center gap-2 ${navbarItemClassName}`}
              >
                {icon} {label}
              </a>
            )}

            {/* ✅ Dropdown Menu */}
            {submenu && openDropdown === label && (
              <ul
                className={`absolute left-0 z-50 transition-all duration-300 ease-in-out ${submenuClassName} 
              ${
                openDropdown === label
                  ? "opacity-100 scale-y-100"
                  : "opacity-0 scale-y-0"
              } origin-top`}
              >
                {submenu.map((item) => (
                  <li key={item.label} className={`${subMenuItemClassName}`}>
                    <a href={item.href} className="">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
