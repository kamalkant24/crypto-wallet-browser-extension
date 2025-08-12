import React from "react";

interface DropDownLayoutProps {
  title: string;
  content: React.JSX.Element;
  onClose: () => void;
  icon: React.ReactNode;
}

const DropDownLayout: React.FC<DropDownLayoutProps> = ({
  title,
  content,
  onClose,
  icon,
}) => {
  return (
    <div className="fixed px-2 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-primary bg-opacity-50">
      <div className="relative w-full md:w-96 md:transform md:-translate-y-36 bg-primary rounded-lg shadow">
        <div className="flex items-center justify-between p-5 border-b border-primary rounded-t">
          <h1 className="text-xl font-medium text-white">{title}</h1>
          <button
            type="button"
            className="text-accent text-lg ml-auto inline-flex justify-center items-center"
            onClick={onClose}
          >
            close
          </button>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-base leading-relaxed text-gray-300">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DropDownLayout;
