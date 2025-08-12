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
import networks_const from "@/utils/networks";
import { useTransactionStore } from "@/services/toogleTransactionService";
import SendTransaction from "./SendTransactions";
import TransactionList, { Transaction } from "./Transaction";


function HomePage() {
  const [selectedOption, setSelectedOption] = useState<string>("tokens"); // Initialize with "tokens"

  const [activeModal, setActiveModal] = useState<string | null>(null); // Track the active modal
  const [localAddress, setLocalAddress] = useState<string | null>("");
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const { isTransactionForm } = useTransactionStore()

  const { balance, network, account, wallet, chainId, isLoggedIn, isSignup } =
    useLogin();

  useEffect(() => { }, [isLoggedIn, isSignup]);

  useEffect(() => { }, [account, balance, wallet, chainId]);

  useEffect(() => {
  if (!account) return; // optional: avoid running without account

  const fetchData = async () => {
    const transactions = await fetchRecentTransactions(account, chainId);
    setRecentTransactions(transactions);
  };

  fetchData();
}, [account, chainId]);
  useEffect(() => { getTransactions() }, [])

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
): Promise<Transaction[]> {
  const net = networks_const.find((network) => network.chainId === chainId);
  if (!net) throw new Error("Unsupported network for tx history: " + chainId);

  const apiKey =
    (process.env as any)[net.apiKeyEnvVar] || process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

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

  const url = `${net.apiUrl}?${q.toString()}`;
console.log('url',url)
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Explorer API error: ${res.status} ${text}`);
  }

  const payload = await res.json();

  if (payload.status === "0" && payload.message !== "OK" && payload.result !== "[]") {
    // Handle error or empty results if needed
  }

  const resultsRaw = payload?.result;

const results = Array.isArray(resultsRaw) ? resultsRaw : [];

  const txs: Transaction[] = results?.map((r) => {
    let status: Transaction["status"] = "pending";

    // Map txreceipt_status from Etherscan API to our status
    // txreceipt_status: "1" = success, "0" = fail
    if ("txreceipt_status" in r) {
      if (r.txreceipt_status === "1") status = "success";
      else if (r.txreceipt_status === "0") status = "failed";
      else status = "unknown";
    } else {
      // If txreceipt_status is missing, fallback:
      // Consider confirmations > 0 as success else pending
      status = r.confirmations > 0 ? "success" : "pending";
    }

    return {
      hash: r.hash,
      timeStamp: Number(r.timeStamp),
      from: r.from,
      to: r.to,
      value: r.value,
      blockNumber: Number(r.blockNumber || 0),
      confirmations: Number(r.confirmations || 0),
      chainId: chainId as any,
      status,
    };
  });

  // Sort descending by timestamp just to be sure
  txs.sort((a, b) => b.timeStamp - a.timeStamp);
  return txs.slice(0, limit);
}


  const getTransactions = async () => {
    const transactions = await fetchRecentTransactions(account ?? "", chainId);
    setRecentTransactions(transactions);
    console.log('recentTransactions',recentTransactions)
  };

  const formatValue = (weiStr: string) => {
    try {
      return formatEther(weiStr); // No more ethers.utils
    } catch {
      return weiStr;
    }
  };
  const net = networks_const[chainId];
  return (
    <div className="  bg-[#0d0d0d]  md:shadow-2xl  h-screen  md:h-[768px] md:w-[768px] md:rounded-xl">
      <ToastContainer />
      <div className=" md:p-2 border-b border-gray-800 shadow-lg md:shadow-lg ">
        <Navbar />
      </div>
      {isTransactionForm ?
        <TransactionList transactions={[]} />
        :
        <div className="md:h-96 md:p-4 ">
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

            </div>
            <div className="m-2 my-4">
              <h1 className="text-3xl text-white">{balance}</h1>
            </div>

          </div>

          <div className="text-white">
            <TransactionList transactions={recentTransactions} />
          </div>
        </div>}
    </div>
  );
}

export default HomePage;
