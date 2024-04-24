import React from "react";

type EditButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  userId: string;
  children?: React.ReactNode;
};

export const EditButton = ({ children, onClick }: EditButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="mt-2 mr-3 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
    >
      {children}
    </button>
  );
};
