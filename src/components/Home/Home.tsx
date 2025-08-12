"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import Activity from "./Activity";
import Tokens from "./Tokens";
import Swap from "../Token/Swap";
import AddNew from "../Token/AddNew";
import Refresh from "../Token/Refresh";
import Send from "../Token/Send";
import { format } from "date-fns";

import {
  ArrowUpRightIcon,
  ArrowPathRoundedSquareIcon,
  ClipboardDocumentIcon,
  PlusCircleIcon,
  ArrowsRightLeftIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import { useLogin } from "@/providers/LoginProvider";
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { formatEther } from "ethers";

export type ChainId = 1 | 11155111 | 5 | 137 | 80001; // add more if needed

export type RecentTx = {
  hash: string;
  timeStamp: number;
  from: string;
  to: string;
  value: string;
  blockNumber: number;
  confirmations?: number;
  status?: "pending" | "success" | "failed" | "unknown";
  chainId: ChainId;
};

type NetworkConfig = {
  chainId: ChainId;
  name: string;
  txApiUrl: string;
  apiKeyEnvVar: string;
};

export const NETWORKS: Record<number, NetworkConfig> = {
  1: {
    chainId: 1,
    name: "Ethereum Mainnet",
    txApiUrl: "https://api.etherscan.io/api",
    apiKeyEnvVar: "NEXT_PUBLIC_ETHERSCAN_API_KEY",
  },
  11155111: {
    chainId: 11155111,
    name: "Sepolia",
    txApiUrl: "https://api-sepolia.etherscan.io/api",
    apiKeyEnvVar: "NEXT_PUBLIC_ETHERSCAN_API_KEY",
  },
  5: {
    chainId: 5,
    name: "Goerli",
    txApiUrl: "https://api-goerli.etherscan.io/api",
    apiKeyEnvVar: "NEXT_PUBLIC_ETHERSCAN_API_KEY",
  },
  137: {
    chainId: 137,
    name: "Polygon Mainnet",
    txApiUrl: "https://api.polygonscan.com/api",
    apiKeyEnvVar: "NEXT_PUBLIC_ETHERSCAN_API_KEY",
  },
  80001: {
    chainId: 80001,
    name: "Mumbai Testnet",
    txApiUrl: "https://api-testnet.polygonscan.com/api",
    apiKeyEnvVar: "NEXT_PUBLIC_ETHERSCAN_API_KEY",
  },
};

function HomePage() {
  const [selectedOption, setSelectedOption] = useState<string>("tokens"); // Initialize with "tokens"

  const [activeModal, setActiveModal] = useState<string | null>(null); // Track the active modal
  const [localAddress, setLocalAddress] = useState<string | null>("");
  const [recentTransactions, setRecentTransactions] = useState<RecentTx[]>([]);

  const { balance, network, account, wallet, chainId, isLoggedIn, isSignup } =
    useLogin();

  useEffect(() => {}, [isLoggedIn, isSignup]);

  useEffect(() => {}, [account, balance, wallet, chainId]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const icons: Record<string, React.ReactNode> = {
    send: <ArrowUpRightIcon className="h-10 w-10 text-blue-500" />,

    addNewToken: <PlusCircleIcon className="h-10 w-10  text-blue-500" />,
  };

  const labels: Record<string, string> = {
    send: "Send",
    addNewToken: "Add New Token",
  };

  const renderModal = () => {
    if (!activeModal) return null;

    switch (activeModal) {
      case "send":
        return <Send onClose={closeModal} />;
      case "addNewToken":
        return <AddNew onClose={closeModal} />;
      default:
        return null;
    }
  };

  async function fetchRecentTransactions(
    address: string,
    chainId: number,
    limit = 10
  ): Promise<RecentTx[]> {
    const net = NETWORKS[chainId];
    if (!net) throw new Error("Unsupported network for tx history: " + chainId);
    const apiKey =
      (process.env as any)[net.apiKeyEnvVar] ||
      process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
    console.log({ net, apiKey });
    const q = new URLSearchParams({
      module: "account",
      action: "txlist",
      address,
      startblock: "0",
      endblock: "99999999",
      page: "1",
      offset: String(limit),
      sort: "desc", 
    });
    if (apiKey) q.append("apikey", apiKey);
    const url = `https://api-sepolia.etherscan.io/api?${q.toString()}`;

    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Explorer API error: ${res.status} ${text}`);
    }

    const payload = await res.json();

    if (
      payload.status === "0" &&
      payload.message !== "OK" &&
      payload.result !== "[]"
    ) {
    }

    const results: any[] = payload.result ?? [];

    const txs: RecentTx[] = results.map((r) => ({
      hash: r.hash,
      timeStamp: Number(r.timeStamp),
      from: r.from,
      to: r.to,
      value: r.value,
      blockNumber: Number(r.blockNumber || 0),
      confirmations: Number(r.confirmations || 0),
      chainId: chainId as any,
      status: undefined, // will be populated by getTxStatus
    }));

    // Already sorted desc because we asked sort=desc, but ensure:
    txs.sort((a, b) => b.timeStamp - a.timeStamp);
    return txs.slice(0, limit);
  }

  const getTransactions = async () => {
    const transactions = await fetchRecentTransactions(account ?? "", chainId);
    console.log({ chainId });
    setRecentTransactions(transactions);
  };

  console.log({ recentTransactions });

  const formatValue = (weiStr: string) => {
    try {
      return formatEther(weiStr); // No more ethers.utils
    } catch {
      return weiStr;
    }
  };
  const net = NETWORKS[chainId];
  return (
    <div className="  bg-[#0d0d0d]  md:shadow-2xl  h-screen  md:h-[768px] md:w-[768px] md:rounded-xl">
      <ToastContainer />
      <div className=" md:p-2 border-b border-gray-800 shadow-lg md:shadow-lg ">
        <Navbar />
      </div>
      <div className="md:h-96 md:p-4">
        <div className="flex flex-col my-4 justify-center items-center   ">
          <div className="flex gap-2 py-2 px-4 m-2 bg-gray-700  rounded-full cursor-text">
            <h1 className="text-[#b3b3b3] text-xl">
              {account?.slice(0, 7)}....{account?.slice(-4)}
            </h1>
            <CopyToClipboard
              text={account ?? ""}
              onCopy={() => {
                toast.success(`Wallet address copied to clipboard`);
              }}
            >
              <button>
                <ClipboardDocumentIcon className="h-4 w-4" />
              </button>
            </CopyToClipboard>

            {/* <CopyToClipboard
                text={wallet?.address}
                onCopy={() => {
                  toast.success("Seed phrase copied to clipboard");
                }}
              >
                <button>
                  <ClipboardDocumentIcon className="h-4 w-4" />
                </button>
              </CopyToClipboard> */}
            {/* {!localAddress && <p>Please import your wallet</p>}  */}
          </div>
          <div className="m-2 my-4">
            <h1 className="text-3xl text-white">{balance}</h1>
          </div>
          <div className="flex   gap-12">
            {Object.keys(icons).map((key) => (
              <button
                key={key}
                className="flex flex-col justify-center items-center p-1 gap-1"
                onClick={() => openModal(key)} // Open modal when the button is clicked
              >
                {icons[key]}
                <p className="text-md">{labels[key]}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-evenly  ">
          <h1
            className={`cursor-pointer w-[1/2] px-18 p-2  text-lg font-light ${
              selectedOption === "tokens"
                ? "text-blue-500 border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => handleOptionClick("tokens")}
          >
            Tokens
          </h1>
          <h1
            className={`cursor-pointer w-[1/2] p-2 px-18 text-lg  font-light ${
              selectedOption === "activity"
                ? "text-blue-500 border-b-2  border-blue-500"
                : ""
            }`}
            onClick={() => handleOptionClick("activity")}
          >
            Activity
          </h1>
        </div>
        {selectedOption === "tokens" ? <Tokens /> : <Activity />}
        {renderModal()}
        <div className="text-white">
          <h2
            className="text-lg border w-fit p-2 cursor-pointer"
            onClick={getTransactions}
          >
            Get Recent Transactions
          </h2>
          <div className="h-[10rem] overflow-auto mt-4">
            {recentTransactions?.slice(0, 10).map((tx) => (
              <li
                key={tx.hash}
                className="flex items-start justify-between gap-3"
              >
                <div className="flex flex-col">
                  <a
                    href={`#`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    {tx.hash.slice(0, 10)}...{tx.hash.slice(-6)}
                  </a>
                  <div className="text-xs text-gray-500">
                    {format(
                      new Date(tx.timeStamp * 1000),
                      "dd MMM yyyy, hh:mm a"
                    )}
                    {" • "}
                    {formatValue(tx.value)}{" "}
                    {net.name.includes("BSC")
                      ? "BNB"
                      : net.name.includes("Polygon")
                      ? "MATIC"
                      : "ETH"}
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      tx.status === "success"
                        ? "bg-green-100 text-green-700"
                        : tx.status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {tx.status ?? "pending"}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {tx.confirmations ? `${tx.confirmations} conf` : ""}
                  </div>
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
