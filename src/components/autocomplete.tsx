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
  onSelectionChange?: (selectedKey: string | null) => void;
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  items,
  placeholder = "Search...",
  className,
  onSelectionChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState<AutocompleteItem[]>(items); // Dynamic list
  const [selectedKey, setSelectedKey] = useState("");
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
    setInputValue("");
    setIsOpen(false);
    onSelectionChange?.(key);
    console.log(`${label} ${key}`);
  };

  const handleClear = () => {
    setInputValue("");
    setSelectedKey("");
    setFilteredItems(items); // 👈 Reset list with latest API items
    setIsOpen(false);
    onSelectionChange?.(null);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Input Field */}
      <div className={`flex items-center p-2 ${className}`}>
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
          className={`absolute w-full border rounded-md mt-2 shadow-lg z-20 ${className} `}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li
                key={item.key}
                className={`p-2 hover:opacity-60 cursor-pointer ${
                  selectedKey === item.key ? "font-bold" : ""
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
