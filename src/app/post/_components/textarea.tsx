import React from "react";

type Props = {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ placeholder, value, onChange }, ref) => {
    return (
      <textarea
        ref={ref}
        placeholder={placeholder}
        value={value || ""} // ここでvalueがundefinedの場合は空の文字列を返す
        onChange={onChange}
        className="m-2 mb-4 h-40 w-full resize-none rounded-3xl border-2 border-solid border-point-green-dark p-4 outline-none"
      />
    );
  },
);

TextArea.displayName = "Textarea";

export default TextArea;
