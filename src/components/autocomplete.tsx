import React, { useState, useEffect } from "react";
import { ChevronDownIcon, XCircle } from "lucide-react";

type AutocompleteItem = {
  label: string;
  key: string;
  description?: string;
};

type AutocompleteProps = {
  items: AutocompleteItem[];
  placeholder?: string;
  className?: string;
  variant?: "flat" | "bordered" | "underlined" | "faded"; // NEW: Style variants
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  onSelectionChange?: (selectedKey: string | null) => void;
};

// Apply the user's styles dynamically inside variants
const variantStyles = {
  flat: (bgColor: string, borderColor: string, textColor: string) =>
    `border-none rounded-md ${bgColor} ${borderColor} ${textColor}`,
  bordered: (bgColor: string, borderColor: string, textColor: string) =>
    `border rounded-md ${bgColor} ${borderColor} ${textColor}`,
  underlined: (bgColor: string, borderColor: string, textColor: string) =>
    `border-b rounded-none ${bgColor} ${borderColor} ${textColor}`,
  faded: (bgColor: string, borderColor: string, textColor: string) =>
    `border opacity-50 ${bgColor} ${borderColor} ${textColor}`,
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  items,
  placeholder = "Search...",
  className = "",
  variant = "bordered", // Default variant
  bgColor = "bg-white",
  borderColor = "border-gray-300",
  textColor = "text-black",
  onSelectionChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState<AutocompleteItem[]>(items); // Dynamic list
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredItems(items); // Refresh dynamically with new data
      setIsOpen(false);
    } else {
      setFilteredItems(
        items.filter((item) =>
          item.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setIsOpen(true);
    }
  }, [inputValue, items]); // 👈 This ensures updates when `items` changes dynamically

  const handleSelect = (key: string, label: string) => {
    setSelectedKey(key);
    setInputValue(label);
    setIsOpen(false);
    onSelectionChange?.(key);
  };

  const handleClear = () => {
    setInputValue("");
    setSelectedKey(null);
    setFilteredItems(items); // 👈 Reset list with latest API items
    setIsOpen(false);
    onSelectionChange?.(null);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Input Field */}
      <div
        className={`flex items-center p-2 ${variantStyles[variant](
          bgColor,
          borderColor,
          textColor
        )} ${bgColor} ${borderColor} ${textColor}`}
        // className={`flex items-center p-2 ${variantStyles[variant](
        //   bgColor,
        //   borderColor,
        //   textColor
        // )} `}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full outline-none bg-transparent"
          placeholder={placeholder}
        />
        {inputValue && (
          <XCircle
            className="size-5 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={handleClear}
          />
        )}
        <ChevronDownIcon
          className={`size-5 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && (
        <ul
          className={`absolute w-full border rounded-md mt-2 shadow-lg z-50 ${variantStyles[
            variant
          ](
            bgColor,
            borderColor,
            textColor
          )} ${bgColor} ${borderColor} ${textColor} `}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li
                key={item.key}
                className={`p-2 hover:bg-gray-200 cursor-pointer ${
                  selectedKey === item.key ? "bg-gray-300 font-bold" : ""
                }`}
                onClick={() => handleSelect(item.key, item.label)}
              >
                <div>{item.label}</div>
                {item.description && (
                  <div className="text-xs text-gray-500">
                    {item.description}
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className={`p-2`}>No matches found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
