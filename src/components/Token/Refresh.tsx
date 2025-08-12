import React from "react";

interface RefreshProps {
  onClose: () => void; // Function to close the modal
}

const Refresh: React.FC<RefreshProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-primary bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-5 border-b rounded-t border-secondary">
          <h3 className="text-xl font-medium text-primary">title</h3>
          <button
            type="button"
            className="text-secondary bg-transparent hover:bg-secondary hover:text-primary rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            onClick={() => onClose()}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-base leading-relaxed text-secondary">content</p>
        </div>
        <div className="flex items-center p-6 space-x-2 border-t border-secondary rounded-b">
          <button
            type="button"
            className="text-white bg-accent hover:bg-accent/90 focus:ring-4 focus:outline-none focus:ring-accent/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => onClose()}
          >
            I accept
          </button>
          <button
            type="button"
            className="text-secondary bg-white hover:bg-secondary/10 focus:ring-4 focus:outline-none focus:ring-secondary/50 rounded-lg border border-secondary text-sm font-medium px-5 py-2.5 hover:text-primary"
            onClick={() => onClose()}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default Refresh;
