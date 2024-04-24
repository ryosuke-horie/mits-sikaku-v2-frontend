import React from "react";

type SelectFieldProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ options, value, onChange }, ref) => {
    return (
      <select
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="m-2 mb-4 h-20 w-full rounded-3xl border-2 border-solid border-point-green-dark pl-4 text-2xl outline-none lg:w-3/5"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  },
);

SelectField.displayName = "SelectField";

export default SelectField;
