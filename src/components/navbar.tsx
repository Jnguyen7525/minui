import React, { useState } from "react";
import { Menu, ChevronDown, Home, List, Box } from "lucide-react";

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
};

const Navbar: React.FC<NavbarProps> = ({ items, logo, className }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav
      className={`flex items-center justify-between p-4 shadow-md  ${className}`}
    >
      {/* ✅ Navbar Logo */}
      <div className="flex items-center gap-2">
        {logo}
        <span className="text-lg font-bold">MyNavbar</span>
      </div>

      {/* ✅ Navbar Items */}
      <ul className="flex gap-4">
        {items.map(({ label, href, icon, submenu }) => (
          <li key={label} className="relative group">
            {submenu ? (
              <button
                onClick={() => handleDropdownToggle(label)}
                className="flex items-center gap-2 text-gray-700"
              >
                {icon} {label} <ChevronDown size={16} />
              </button>
            ) : (
              <a
                href={href ?? "#"}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
              >
                {icon} {label}
              </a>
            )}

            {/* ✅ Dropdown Menu */}
            {submenu && openDropdown === label && (
              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                {submenu.map((item) => (
                  <li key={item.label} className="p-2 hover:bg-gray-100">
                    <a href={item.href} className="text-gray-700">
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
