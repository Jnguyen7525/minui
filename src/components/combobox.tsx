import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

type Option = { key: string; label: string };
type ComboboxProps = {
  options: Option[]; // ✅ Pass dynamic options
  onSelect?: (selectedKey: string, label: string) => void; // ✅ Custom action on selection
  inputStyle?: string;
  triggerStyle?: string;
  optionsStyle?: string;
  className?: string;
};

const Combobox: React.FC<ComboboxProps> = ({
  options,
  onSelect,
  inputStyle,
  triggerStyle,
  optionsStyle,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (key: string, label: string) => {
    setSelected(key);
    setSearchValue("");
    setIsOpen(false);
    onSelect?.(key, label); // ✅ Execute custom function if provided
  };

  return (
    <div className={`relative ${className}`}>
      {/* Dropdown Trigger */}
      <button className={`${triggerStyle}`} onClick={() => setIsOpen(!isOpen)}>
        {selected
          ? options.find((opt) => opt.key === selected)?.label
          : "Select an option..."}
        <ChevronsUpDown className="opacity-50" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute w-full z-50 ${inputStyle}`}>
          {/* Search Input */}
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full p-2 border-b"
            placeholder="Search..."
          />

          {/* Options List */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleSelect(opt.key, opt.label)}
                className={`${optionsStyle}`}
              >
                {opt.label}
                <Check
                  className={selected === opt.key ? "opacity-100" : "opacity-0"}
                />
              </button>
            ))
          ) : (
            <div className="p-2">No matches found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Combobox;
