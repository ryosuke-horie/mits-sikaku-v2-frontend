import React, { ForwardedRef } from "react";

type Props = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = React.forwardRef<HTMLInputElement, Props>(
  (
    { type, placeholder, value, onChange }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value || ""} // ここでvalueがundefinedの場合は空の文字列を返す
        onChange={onChange}
        ref={ref}
        className="m-2 mb-4 h-20 w-full rounded-3xl border-2 border-solid border-point-green-dark pl-4 text-2xl outline-none lg:w-3/5"
      />
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
