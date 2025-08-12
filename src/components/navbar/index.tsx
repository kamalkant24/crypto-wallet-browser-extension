import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import NetworkDropdown from "./dropdown/NetworkDropdown";
import AccountDropdown from "./dropdown/AccountDropdown";
import MenuDropdown from "./dropdown/MenuDropdown";
import DropdownButton from "./dropdown/DropdownButton";
import { Ethereum } from "@/svg-icons/Ethereum";
import { Polygon } from "@/svg-icons/Polygon";
import { useLogin } from "@/providers/LoginProvider";
import networks_const from "@/utils/networks";
import SendTransaction from "../Home/SendTransactions";

function Navbar() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { chainId } = useLogin();

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const renderModal = () => {
    if (!activeModal) return null;

    switch (activeModal) {
      case "network":
        return <NetworkDropdown onClose={closeModal} />;
      case "accounts":
        return <AccountDropdown onClose={closeModal} />;
      case "menu":
        return <MenuDropdown onClose={closeModal} />;
      default:
        return null;
    }
  };

  const icons: Record<string, React.ReactNode> = {
    network: (
      <div className="flex justify-center items-center gap-x-4">
        <span className="hidden md:flex text-primary">
          {
            networks_const.find((network) => network.chainId === chainId)
              ?.network
          }
        </span>
        <div className="md:hidden">
          {chainId === 1 || chainId === 11155111 || chainId === 5 ? (
            <Ethereum />
          ) : (
            <Polygon />
          )}
        </div>
        <ChevronDownIcon className="h-8 w-8 text-primary" />
      </div>
    ),
    accounts: (
      <>
        <span className="text-primary">Accounts</span>
        <ChevronDownIcon className="h-8 w-8 text-primary" />
      </>
    ),
    menu: (
      <>
        <EllipsisVerticalIcon className="h-8 w-8 text-primary" />
      </>
    ),
  };

  return (
    <div>
      <div className="bg-secondary flex justify-between items-center px-4 relative py-3">
        <div className="flex w-full justify-between gap-1">
          {Object.keys(icons).map((key) => (
            <DropdownButton
              key={key}
              icon={icons[key]}
              onClick={() => openModal(key)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center">{renderModal()}</div>
    </div>
  );
}

export default Navbar;
