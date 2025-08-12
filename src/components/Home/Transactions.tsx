import React, { useState } from "react";
import { ethers } from "ethers";
import QrDropZone from "../QrZone/QrDropZone"; // adjust import path

import networks_const from "@/utils/networks";
import { useLogin } from "@/providers/LoginProvider";
import { getProvider } from "@/utils/providers";
const { network,chainId } = useLogin();
export default function SendTransaction() {
  const [form, setForm] = useState({
    recipient: "",
    amount: "",
    currency: "ETH",
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [txStatus, setTxStatus] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [chainId, setChainId] = useState(1);

  // Replace with actual provider from your wallet connection or ethers provider
  
  const provider = new ethers.JsonRpcProvider(getProvider(chainId));

  const handleSend = async () => {
    try {
      setTxStatus("Waiting for user confirmation...");
      const signer = await provider.getSigner();

      const txResponse = await signer.sendTransaction({
        to: form.recipient,
        value: ethers.parseEther(form.amount),
      });

      setTxHash(txResponse.hash);
      setTxStatus("Transaction sent! Waiting for confirmation...");

      await txResponse.wait();
      setTxStatus("Transaction confirmed!");
    } catch (error: any) {
      setTxStatus("Transaction failed or rejected.");
      console.error(error);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Send Transaction</h2>

      <QrDropZone
        setRecipient={(address) => setForm({ ...form, recipient: address })}
      />

      <label>
        Recipient Address:
        <input
          type="text"
          value={form.recipient}
          onChange={(e) => setForm({ ...form, recipient: e.target.value })}
          placeholder="0x..."
          style={{ width: "100%", marginBottom: 10 }}
        />
      </label>

      <label>
        Amount ({form.currency}):
        <input
          type="number"
          min="0"
          step="any"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          style={{ width: "100%", marginBottom: 10 }}
        />
      </label>

      <button
        onClick={() => setShowConfirm(true)}
        disabled={!form.recipient || !form.amount}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Send
      </button>

      {showConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 8,
              width: "90%",
              maxWidth: 400,
            }}
          >
            <h3>Confirm Transaction</h3>
            <p>
              Send <b>{form.amount} {form.currency}</b> to:
            </p>
            <p
              style={{
                wordBreak: "break-all",
                background: "#eee",
                padding: 10,
                borderRadius: 4,
                fontFamily: "monospace",
              }}
            >
              {form.recipient}
            </p>

            <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
              <button onClick={handleSend} style={{ backgroundColor: "#4caf50", color: "white" }}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {txStatus && (
        <div style={{ marginTop: 20 }}>
          <p>Status: {txStatus}</p>
          {txHash && (
            <p>
              View on block explorer:{" "}
              <a
                href={`${networks_const[chainId]}${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
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
