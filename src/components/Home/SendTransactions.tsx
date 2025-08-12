import React, { useState } from "react";
import { ethers } from "ethers";
import QrDropZone from "../QrZone/QrDropZone"; // adjust import path

import networks_const from "@/utils/networks";
import { getProvider } from "@/utils/providers";
import { useTransactionStore } from "@/services/toogleTransactionService";
import { useLogin } from "@/providers/LoginProvider";
export default function SendTransaction() {

  const [form, setForm] = useState({
    recipient: "",
    amount: "",
    currency: "ETH",
  });


  const [showConfirm, setShowConfirm] = useState(false);
  const [txStatus, setTxStatus] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  
  const { wallet, chainId } =useLogin();
    console.log('wallet', wallet)
  // Replace with actual provider from your wallet connection or ethers provider

  

  const handleSend = async () => {
    try {
      setTxStatus("Waiting for user confirmation...");
      const provider = new ethers.JsonRpcProvider(getProvider(chainId));
      const network = await provider.getNetwork();

      const privateKey = wallet?.[0]?.Account1?.privateKey;

      if (!privateKey) {
        throw new Error("Private key not found");
      }
      
      const signer = new ethers.Wallet(privateKey, provider);

      const balance = await provider.getBalance(signer.address);
      console.log(ethers.formatEther(balance), "ETH");
      console.log('form',form)
      const txResponse = await signer.sendTransaction({
        to: form.recipient,
        value: ethers.parseEther(form.amount),
      });
      console.log('txResponse',txResponse)
      setTxHash(txResponse.hash);
      setTxStatus("Transaction sent! Waiting for confirmation...");

      await txResponse.wait();
      setTxStatus("Transaction confirmed!");
    } catch (error: any) {
      setTxStatus("Transaction failed or rejected.");
      console.log('error',error);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
  <div className="max-w-md mx-auto p-5 text-white bg-gray-900 rounded-xl shadow-lg mt-10">
  {/* Header */}
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-semibold">Send Transaction</h2>
   
  </div>

  {/* QR Drop Zone */}
  <QrDropZone
    setRecipient={(address) => setForm({ ...form, recipient: address })}
  />

  {/* Recipient Input */}
  <label className="block mt-4">
    <span className="text-sm font-medium">Recipient Address</span>
    <input
      type="text"
      value={form.recipient}
      onChange={(e) => setForm({ ...form, recipient: e.target.value })}
      placeholder="0x..."
      className="w-full mt-1 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
    />
  </label>

  {/* Currency Field */}
  <label className="block mt-4">
    <span className="text-sm font-medium">Currency</span>
    <select
      value={form.currency}
      onChange={(e) => setForm({ ...form, currency: e.target.value })}
      className="w-full mt-1 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
    >
      <option value="">Select Currency</option>
      <option value="ETH">ETH</option>
      <option value="USDT">USDT</option>
      <option value="DAI">DAI</option>
      <option value="MATIC">MATIC</option>
    </select>
  </label>

  {/* Amount Input */}
  <label className="block mt-4">
    <span className="text-sm font-medium">Amount ({form.currency || "..."})</span>
    <input
      type="number"
      min="0"
      step="any"
      value={form.amount}
      onChange={(e) => setForm({ ...form, amount: e.target.value })}
      className="w-full mt-1 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
    />
  </label>

  {/* Send Button */}
  <button
    onClick={() => setShowConfirm(true)}
    disabled={!form.recipient || !form.amount || !form.currency}
    className="mt-6 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Send
  </button>

  {/* Confirmation Modal */}
  {showConfirm && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black p-5 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Confirm Transaction</h3>
        <button
          className="bg-secondary px-4 py-2 rounded-lg text-white text-center text-lg w-full mb-4"
        >
          Send {form.amount} {form.currency} to:
        </button>
        <p className="break-all bg-gray-100 p-3 rounded-lg font-mono">
          {form.recipient}
        </p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => setShowConfirm(false)}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Transaction Status */}
  {txStatus && (
    <div className="mt-4">
      <p>Status: {txStatus}</p>
      {txHash && (
        <p>
          View on block explorer:{" "}
          <a
            href={`${networks_const[chainId]}${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {txHash.substring(0, 10)}...{txHash.slice(-8)}
          </a>
        </p>
      )}
    </div>
  )}
</div>


  );
}
