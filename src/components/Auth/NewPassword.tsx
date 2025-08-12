import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = () => {
    if (password !== confirmPassword) {
      toast.error("The passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("The password must be greater than 5 characters");
      return;
    }

    navigate("/home");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-primary text-white">
      <ToastContainer />
      <div className="flex flex-start">
        {/* <button onClick={() => navigate("/import-existing")}>
          <ArrowLeftIcon className="h-6 w-6 text-accent" />
        </button> */}
      </div>
      <h1 className="text-3xl font-semibold p-4 text-accent">Create Password</h1>
      <div>
        <div className="m-3">
          <label className="block m-2 text-sm font-medium text-accent">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-secondary border border-accent text-white placeholder-gray-300 text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5"
            placeholder="•••••••••"
            required
          />
        </div>
        <div className="m-3">
          <label className="block m-2 text-sm font-medium text-accent">
            Confirm password
          </label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirm_password"
            className="bg-secondary border border-accent text-white placeholder-gray-300 text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5"
            placeholder="•••••••••"
            required
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onSubmit}
        className="text-primary bg-accent hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-200 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Restore
      </button>
    </div>
  );
}
