// MenuDropdown.tsx
import React from "react";
import DropDownLayout from "./DropDownLayout";
import {
  LockClosedIcon,
  EllipsisVerticalIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/providers/LoginProvider";
import { useTransactionStore } from "@/services/toogleTransactionService";

interface MenuProps {
  onClose: () => void;
}

const MenuContent = ({ onClose }: MenuProps) => {
  const navigate = useNavigate();
  const { signOut, logout } = useLogin();
  const toggleTransactionService = useTransactionStore(
    (state) => state.toggleTransactionService
  );

  const signOutHandler = () => {
    const signout = signOut();
    if (signout) {
      navigate("/signup");
    }
  };

  const logOutHandler = () => {
    const isLogout = logout();
    if (isLogout) {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col w-full gap-1">
      <button
        className="flex justify-start my-2 items-start flex-grow gap-2 p-2 border border-secondary text-white hover:bg-accent w-full rounded-md transition-colors"
        onClick={signOutHandler}
      >
        <ArrowRightOnRectangleIcon className="h-8 w-8 text-accent" />
        <h2 className="text-lg font-medium">Sign Out</h2>
      </button>

      <button
        className="flex justify-start my-2 items-start flex-grow gap-2 p-2 border border-secondary text-white hover:bg-accent w-full rounded-md transition-colors"
        onClick={logOutHandler}
      >
        <LockClosedIcon className="h-8 w-8 text-accent" />
        <h2 className="text-lg font-medium">Lock Wallet</h2>
      </button>
    </div>
  );
};

const MenuDropdown: React.FC<MenuProps> = ({ onClose }) => {
  return (
    <DropDownLayout
      title="Menu"
      content={<MenuContent onClose={onClose} />}
      onClose={onClose}
      icon={<EllipsisVerticalIcon className="h-6 w-6 text-accent" />}
    />
  );
};

export default MenuDropdown;
