// MenuDropdown.tsx
import React from "react";
import DropDownLayout from "./DropDownLayout";
import {
  CurrencyRupeeIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  LockClosedIcon,
  EllipsisVerticalIcon,
  ArrowUpRightIcon,
  ArrowsRightLeftIcon,
  CurrencyDollarIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom"
import {useLogin} from "@/providers/LoginProvider"

interface MenuProps {
  onClose: () => void;
}



const MenuContent = () => {

  const navigate = useNavigate()
  const { signOut, logout } = useLogin();


  const signOutHandler = () => {
    const signout = signOut();
    if (signout) {
      navigate("/signup")
    }
  }


  const logOutHandler = () => {
    const isLogout = logout();
    if (isLogout) {
      navigate("/login")
    }
  }

  return (
    <div className="flex flex-col w-full  gap-1">
      <button className="flex justify-start my-2 items-start  flex-grow gap-2 p-2 border border-gray-600 w-full">
        <KeyIcon className="h-8 w-8" />
        <h2 className="text-lg font-medium">Transactions</h2>
      </button>
      <button className="flex justify-start my-2 items-start  flex-grow gap-2 p-2 border border-gray-600 w-full">
        <CurrencyDollarIcon className="h-8 w-8" />
        <h2 className="text-lg font-medium">Reveal Secret Phrase</h2>
      </button>
      <button
        className="flex justify-start my-2 items-start  flex-grow gap-2 p-2 border border-gray-600 w-full"
        onClick={()=>signOutHandler()}
      >
        <ArrowRightOnRectangleIcon className="h-8 w-8" />
        <h2 className="text-lg font-medium">Sign Out</h2>
      </button>
      <button
        className="flex justify-start my-2 items-start  flex-grow gap-2 p-2 border border-gray-600 w-full"
        onClick={() => logOutHandler()}
      >
        <LockClosedIcon className="h-8 w-8" />
        <h2 className="text-lg font-medium">Lock Wallet</h2>
      </button>
    </div>
  );
};

const MenuDropdown: React.FC<MenuProps> = ({ onClose }) => {
  return (
    <DropDownLayout
      title="Menu"
      content={<MenuContent/>}
      onClose={onClose}
      icon={<EllipsisVerticalIcon className="h-6 w-6" />}
    />
  );
};

export default MenuDropdown;
