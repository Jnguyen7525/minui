import React, { useState } from "react";
import Checkbox from "./checkbox";

type CheckboxGroupProps = {
  options: { id: string; label: string }[];
  selectedValues?: string[];
  onChange?: (selected: string[]) => void;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  const [selected, setSelected] = useState(selectedValues || []);

  const isControlled = selectedValues !== undefined;
  const currentSelection = isControlled ? selectedValues : selected;

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const newSelection = checked
      ? [...currentSelection, id]
      : currentSelection.filter((item) => item !== id);
    if (!isControlled) setSelected(newSelection);
    onChange?.(newSelection);
  };

  const handleSelectAll = () => {
    const allSelected = currentSelection.length === options.length;
    const newSelection = allSelected ? [] : options.map((opt) => opt.id);
    if (!isControlled) setSelected(newSelection);
    onChange?.(newSelection);
  };

  return (
    <div role="group" className="flex flex-col gap-3">
      {options.map(({ id, label }) => (
        <div key={id} className="flex items-center gap-3">
          <Checkbox
            id={id}
            checked={currentSelection.includes(id)}
            onChange={(checked) => handleCheckboxChange(id, checked)}
          />
          <label htmlFor={id} className="text-sm">
            {label}
          </label>
        </div>
      ))}
      {/* Select All Checkbox */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="select-all"
          checked={currentSelection.length === options.length}
          onChange={handleSelectAll}
        />
        <label htmlFor="select-all" className="text-sm">
          Select All
        </label>
      </div>
    </div>
  );
};

export { CheckboxGroup };
