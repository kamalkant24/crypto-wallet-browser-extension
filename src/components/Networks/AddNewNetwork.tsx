import React from "react";
import {
  CurrencyDollarIcon,
  GlobeAltIcon,
} from "@heroicons/react/20/solid";
import DropDownLayout from "../navbar/dropdown/DropDownLayout";

interface AddNewNetworkProps {
  onClose: () => void; // Function to close the modal
}

const NetworkContent = () => {
  return (
    <div className="flex flex-col w-full gap-1">
      <div className="overflow-y-auto">
        <button className="flex justify-evenly items-start my-2 flex-grow gap-2 p-2 border border-secondary w-full hover:bg-secondary/20 transition-colors">
          <CurrencyDollarIcon className="h-8 w-8 text-primary" />
          <h2 className="text-lg font-medium text-primary">Ethereum</h2>
        </button>
      </div>

      <button className="flex justify-center items-center text-accent hover:underline">
        Add A Network
      </button>
    </div>
  );
};

const AddNewNetwork: React.FC<AddNewNetworkProps> = ({ onClose }) => {
  return (
    <DropDownLayout
      title="Network"
      content={<NetworkContent />}
      onClose={onClose}
      icon={<GlobeAltIcon className="h-6 w-6 text-primary" />}
    />
  );
};

export default AddNewNetwork;
