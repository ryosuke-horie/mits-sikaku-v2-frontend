import React from "react";

type DeleteButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  userId: string;
  children?: React.ReactNode;
};

export const DeleteButton = ({
  children,
  onClick,
  userId,
}: DeleteButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="mt-2 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none"
      data-user-id={userId}
    >
      {children}
    </button>
  );
};
