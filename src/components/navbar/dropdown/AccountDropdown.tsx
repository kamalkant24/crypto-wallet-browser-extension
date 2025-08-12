// AccountDropdown.tsx
import React, { useEffect, useState } from "react";
import DropDownLayout from "./DropDownLayout";
import {
  EllipsisVerticalIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { useLogin } from "@/providers/LoginProvider";
import { toast } from "react-toastify";

interface AccountProps {
  onClose: () => void;
}

const AccountContent = () => {
  const [addNewAccount, setNewAccount] = useState(false);
  const [accountName, setAccountName] = useState<string | null>(null);

  const { account, addAccount, wallet, switchAccount } = useLogin();

  const handleAddAccount = async () => {
    if (!accountName) {
      toast.error("account name cannot be empty");
      return;
    }

    const isAccountAdded = await addAccount(accountName);
    if (isAccountAdded) {
      toast.success("account added");
    }
  };

  const handleSwitchAccount = async (privateKey: string) => {
    if (!privateKey) {
      toast.error("unable to switch account");
      return;
    }

    const isSwitchAccount = await switchAccount(privateKey);
    if (isSwitchAccount) {
      toast.success("account switched");
    } else {
      toast.error("unable to switch account");
    }
  };

  return (
    <div>
      <div>
        {addNewAccount ? (
          <div className="flex flex-col w-full gap-1">
            <div className="overflow-y-auto flex my-2 flex-col justify-center items-center gap-2">
              <input
                placeholder="account name"
                className="bg-secondary rounded-md border-none outline-none w-2/3 py-2 px-4 text-white"
                type="text"
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            <div className="flex justify-evenly my-2">
              <button
                type="button"
                onClick={() => setNewAccount(!addNewAccount)}
                className="flex justify-center items-center text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleAddAccount()}
                className="flex justify-center items-center text-white bg-accent hover:bg-secondary focus:ring-4 focus:ring-accent font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-1">
            <div className="overflow-y-auto flex py-4 px-2 max-h-40 flex-col gap-2">
              {wallet?.map((accountData, index) => (
                <button
                  key={index}
                  className="flex justify-start items-center flex-grow gap-2 p-2 border border-secondary w-full"
                  onClick={() =>
                    handleSwitchAccount(
                      accountData[Object.keys(accountData)[0]].privateKey
                    )
                  }
                >
                  <div className="flex flex-col justify-start items-start">
                    <h2 className="text-lg font-medium">
                      Account {index + 1}
                    </h2>
                    <h2 className="text-md">
                      {accountData[Object.keys(accountData)[0]].address?.slice(
                        0,
                        7
                      )}
                      ...
                      {accountData[Object.keys(accountData)[0]].address?.slice(
                        -4
                      )}
                    </h2>
                  </div>
                  <EllipsisVerticalIcon className="h-8 w-8 ml-auto text-secondary" />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setNewAccount(!addNewAccount)}
              className="flex justify-center items-center text-accent"
            >
              Add New Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const AccountDropdown: React.FC<AccountProps> = ({ onClose }) => {
  return (
    <DropDownLayout
      title="Select Account"
      content={<AccountContent />}
      onClose={onClose}
      icon={<UserCircleIcon className="h-6 w-6 text-primary" />}
    />
  );
};

export default AccountDropdown;
