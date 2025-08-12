import React, { useState } from "react";
import { useTransactionStore } from "@/services/toogleTransactionService";
import { format } from "date-fns";
import { formatEther } from "ethers";
import SendTransaction from "./SendTransactions";

export type Transaction = {
    hash: string;
    timeStamp: number;
    from: string;
    to: string;
    value: string;
    blockNumber: number;
    confirmations?: number;
    status?: "pending" | "success" | "failed" | "unknown";
    chainId: number;
};

const networksBlockAccess: { [chainId: number]: string } = {
  1: "https://etherscan.io/tx/",
  11155111: "https://sepolia.etherscan.io/tx/",
  137: "https://polygonscan.com/tx/",
  80001: "https://mumbai.polygonscan.com/tx/",
};


interface TransactionListProps {
    transactions: Transaction[];
}

const formatValue = (weiStr: string) => {
    try {
        return formatEther(weiStr); // No more ethers.utils
    } catch {
        return weiStr;
    }
};

export default function TransactionList({ transactions }: TransactionListProps) {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [transactionForm, setTransactionForm] = useState(false);
    const toggleTransactionService = useTransactionStore(
        (state) => state.toggleTransactionService
    );

    const openModal = (modalName: string) => {
        setActiveModal(modalName);
    };
    const closeModal = () => setActiveModal(null);

    const renderModal = () => {
        if (!activeModal) return null;

        switch (activeModal) {
            case "sendTransaction":
                return (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        {/* Modal container - relative positioning enables absolute children positioning */}
                        <div className="relative bg-gray-900 rounded-lg p-6 max-w-lg w-full">
                            {/* Close button positioned absolutely at top-right inside the modal */}
                            <button
                                className="absolute top-4 right-4 text-secondary border border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/50 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 hover:bg-secondary/10"
                                onClick={closeModal}
                            >
                                Close
                            </button>

                            {/* The modal content */}
                            <SendTransaction />
                        </div>
                    </div>
                );
            // other modals if any
            default:
                return null;
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 text-white rounded-xl shadow-lg p-5">
            {/* Header */}
            {/* <div className="flex justify-end mb-2">
                <span
                    className="text-blue-500 cursor-pointer hover:underline"
                    onClick={toggleTransactionService}
                >
                    Back To Home
                </span>
            </div> */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                    {transactionForm && "Create"} Recent Transactions
                </h2>
                <button
                    onClick={() => {
                        openModal("sendTransaction");
                    }}
                    className="px-4 py-2 bg-secondary text-white hover:bg-accent rounded-lg text-sm font-medium"
                >
                    {transactionForm ? "Back to the List" : "Send Transaction"}
                </button>
            </div>

            {transactions.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">No transactions yet</p>
            ) : (
                <ul className="divide-y divide-gray-800">
                    {transactions?.slice(0, 5).map((tx) => (
                        <li
                            key={tx.hash}
                            className="py-3 flex justify-between items-center"
                        >
                            <div>
                                <a href={`${networksBlockAccess[tx.chainId] || 'https://etherscan.io/'}${tx.hash}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:underline">
                                    Hash: {tx.hash.slice(0, 10)}...{tx.hash.slice(-6)}
                                </a>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">
                                    Date:{" "}
                                    {format(new Date(tx.timeStamp * 1000), "dd MMM yyyy, hh:mm a")}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">
                                    {formatValue(tx.value)}
                                </p>
                            </div>
                            <div className="text-right">
                                <span
                                    className={`text-xs text-white px-2 py-0.5 rounded ${tx.status === "success"
                                            ? "bg-green-600"
                                            : tx.status === "pending"
                                                ? "bg-yellow-500"
                                                : "bg-red-600"
                                        }`}
                                >
                                    {tx.status ?? "pending"}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {renderModal()}
        </div>
    );
}
