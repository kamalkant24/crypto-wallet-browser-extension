import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PasswordProps {
  setPassword: (pass: string) => void;
  setIsSubmit: (sub: boolean) => void;
}

export const Password: React.FC<PasswordProps> = ({
  setPassword,
  setIsSubmit,
}) => {
  const navigate = useNavigate();

  const [pass, setPass] = useState<string | null>(null);
  const [confirmPass, setConfirmPass] = useState<string | null>(null);

  const onSubmit = () => {
    if (pass !== confirmPass) {
      toast.error("The passwords do not match");
      return;
    }

    if (pass === null || pass.length < 6) {
      toast.error("The password must be greater than 5 characters");
      return;
    }
    if (pass !== null) {
      setPassword(pass);
      setIsSubmit(true);
      return;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <ToastContainer />
      <h1 className="text-3xl font-semibold p-4 text-primary">Create Password</h1>
      <div className="w-full max-w-md">
        <div className="m-3">
          <label className="block m-2 text-sm font-medium text-secondary">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPass(e.target.value)}
            className="bg-neutral-50 border border-secondary text-primary text-sm rounded-lg 
              focus:ring-accent focus:border-accent block w-full p-2.5"
            placeholder="•••••••••"
            required
          />
        </div>
        <div className="m-3">
          <label className="block m-2 text-sm font-medium text-secondary">
            Confirm password
          </label>
          <input
            type="password"
            onChange={(e) => setConfirmPass(e.target.value)}
            id="confirm_password"
            className="bg-neutral-50 border border-secondary text-primary text-sm rounded-lg 
              focus:ring-accent focus:border-accent block w-full p-2.5"
            placeholder="•••••••••"
            required
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={onSubmit}
          className="text-white bg-secondary border-secondary hover:bg-accent focus:outline-none focus:ring-4 focus:ring-accent 
            font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};
