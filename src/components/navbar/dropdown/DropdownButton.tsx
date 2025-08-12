import React from "react";

interface DropdownButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  text?: string;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  icon,
  onClick,
  text,
}) => {
  return (
    <button
      className="group flex flex-col justify-center items-center px-4 py-2 md:bg-secondary hover:bg-accent rounded-xl"
      onClick={onClick}
    >
      <div className="flex gap-2 justify-center items-center">
        <h1 className="hidden md:flex text-secondary group-hover:text-white">
          {text}
        </h1>
        {icon}
      </div>
    </button>
  );
};

export default DropdownButton;
