// import React, { useState } from "react";
// import { Check, ChevronsUpDown } from "lucide-react";

// type Option = { key: string; label: string };
// type ComboboxProps = {
//   options: Option[]; // ✅ Pass dynamic options
//   onSelect?: (selectedKey: string, label: string) => void; // ✅ Custom action on selection
//   inputStyle?: string;
//   triggerStyle?: string;
//   optionsStyle?: string;
//   className?: string;
// };

// const Combobox: React.FC<ComboboxProps> = ({
//   options,
//   onSelect,
//   inputStyle,
//   triggerStyle,
//   optionsStyle,
//   className,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const [selected, setSelected] = useState<string | null>(null);

//   const filteredOptions = options.filter((opt) =>
//     opt.label.toLowerCase().includes(searchValue.toLowerCase())
//   );

//   const handleSelect = (key: string, label: string) => {
//     setSelected(key);
//     setSearchValue("");
//     setIsOpen(false);
//     onSelect?.(key, label); // ✅ Execute custom function if provided
//   };

//   return (
//     <div className={`relative ${className}`}>
//       {/* Dropdown Trigger */}
//       <button className={`${triggerStyle}`} onClick={() => setIsOpen(!isOpen)}>
//         {selected
//           ? options.find((opt) => opt.key === selected)?.label
//           : "Select an option..."}
//         <ChevronsUpDown className="opacity-50" />
//       </button>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <div className={`absolute w-full z-50 ${inputStyle}`}>
//           {/* Search Input */}
//           <input
//             type="text"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             className="w-full p-2 border-b"
//             placeholder="Search..."
//           />

//           {/* Options List */}
//           {filteredOptions.length > 0 ? (
//             filteredOptions.map((opt) => (
//               <button
//                 key={opt.key}
//                 onClick={() => handleSelect(opt.key, opt.label)}
//                 className={`${optionsStyle}`}
//               >
//                 {opt.label}
//                 <Check
//                   className={selected === opt.key ? "opacity-100" : "opacity-0"}
//                 />
//               </button>
//             ))
//           ) : (
//             <div className="p-2">No matches found.</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Combobox;

import React, { useState, createContext, useContext } from "react";
import { Check } from "lucide-react";

type Option = { key: string; label: string };

type ComboboxContextProps = {
  selected: string | null;
  setSelected: (key: string) => void;
  searchValue: string;
  setSearchValue: (val: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  filteredOptions: Option[];
  options: Option[];
  onSelect?: (key: string, label: string) => void;
};

const ComboboxContext = createContext<ComboboxContextProps | null>(null);

export const useComboboxContext = () => {
  const ctx = useContext(ComboboxContext);
  if (!ctx) throw new Error("Must be used inside <Combobox>");
  return ctx;
};

type ComboboxProps = {
  options: Option[];
  onSelect?: (key: string, label: string) => void;
  children: React.ReactNode;
  className?: string;
};

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  onSelect,
  children,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (key: string) => {
    const label = options.find((opt) => opt.key === key)?.label || "";
    setSelected(key);
    setSearchValue("");
    setIsOpen(false);
    onSelect?.(key, label);
  };

  return (
    <ComboboxContext.Provider
      value={{
        options,
        selected,
        setSelected: handleSelect,
        searchValue,
        setSearchValue,
        isOpen,
        setIsOpen,
        filteredOptions,
        onSelect,
      }}
    >
      <div className={`relative ${className}`}>{children}</div>
    </ComboboxContext.Provider>
  );
};

export const ComboboxTrigger: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  const { selected, options, setIsOpen, isOpen } = useComboboxContext();
  const label = selected
    ? options.find((opt) => opt.key === selected)?.label
    : "Select an option...";

  return (
    <button className={className} onClick={() => setIsOpen(!isOpen)}>
      {label}
      {children}
    </button>
  );
};

export const ComboboxSearchInput: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { searchValue, setSearchValue } = useComboboxContext();
  return (
    <input
      type="text"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className={`w-full p-2 border-b ${className}`}
      placeholder="Search..."
    />
  );
};

export const ComboboxOptionList: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { filteredOptions } = useComboboxContext();

  return filteredOptions.length > 0 ? (
    <div className={className}>
      {filteredOptions.map((opt) => (
        <ComboboxOptionItem key={opt.key} option={opt} />
      ))}
    </div>
  ) : (
    <div className="p-2">No matches found.</div>
  );
};

export const ComboboxOptionItem: React.FC<{ option: Option }> = ({
  option,
}) => {
  const { selected, setSelected } = useComboboxContext();
  const isSelected = selected === option.key;

  return (
    <button
      onClick={() => setSelected(option.key)}
      className="w-full flex justify-between items-center p-2 hover:opacity-60 hover:cursor-pointer"
    >
      {option.label}
      <Check className={`${isSelected ? "opacity-100" : "opacity-0"} ml-2`} />
    </button>
  );
};

export const ComboboxDropdown: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const { isOpen } = useComboboxContext();

  if (!isOpen) return null;

  return (
    <div className={`absolute  ${className}`}>
      <ComboboxSearchInput className="w-full p-2 border-b" />
      <ComboboxOptionList className="flex flex-col" />
    </div>
  );
};
