"use client";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/svg-icons/Logo";

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="flex bg-primary flex-col justify-center items-center gap-4 h-screen md:h-[768px] md:w-[768px] md:rounded-lg">
      <Logo />
      <div className="">
        <h1 className="text-3xl md:text-5xl text-secondary my-2 px-4 whitespace-nowrap">
          Welcome to Crypto Wallet
        </h1>
        <div className="flex flex-col justify-center items-center m-4 gap-4">
          <button
            className="flex select-none items-center gap-3 rounded-lg bg-white py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-gray-900 shadow-md shadow-gray-500/10 transition-all hover:shadow-lg hover:shadow-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => navigate("/import-existing")}
          >
            Import Existing Wallet
          </button>
          <button
            className="group relative flex select-none items-center gap-3 overflow-hidden rounded-lg bg-accent py-3.5 px-7 pr-[72px] text-center align-middle font-sans text-md font-bold uppercase text-white shadow-md shadow-yellow-500/20 transition-all hover:shadow-lg hover:shadow-yellow-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => navigate("/create-new")}
          >
            Create New Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
