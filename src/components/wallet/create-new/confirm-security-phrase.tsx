import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as bip39 from "bip39";
import { ethers } from "ethers";

interface ConfirmSecurityPhaseProps {
  secretPhrase: string;
  setIsSubmit: (submit: boolean) => void;
}

export const ConfirmSecretRecoveryPhase: React.FC<ConfirmSecurityPhaseProps> = ({
  secretPhrase,
  setIsSubmit,
}) => {
  const numberOfRows = 4; // Number of rows
  const inputsPerRow = 3; // Number of inputs per row
  const totalInputs = numberOfRows * inputsPerRow;

  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState<string[]>(
    Array(totalInputs).fill("")
  );
  const [showPasswords, setShowPasswords] = useState<boolean[]>(
    Array(totalInputs).fill(false)
  );

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const words = pastedText.split(" ");
    const newInputValues = [...inputValues];
    words.slice(0, totalInputs).forEach((word, i) => {
      newInputValues[i] = word;
    });
    setInputValues(newInputValues);
  };

  const togglePasswordVisibility = (index: number) => {
    const newShowPasswords = [...showPasswords];
    newShowPasswords[index] = !newShowPasswords[index];
    setShowPasswords(newShowPasswords);
  };

  const isAllField = () => inputValues.every((value) => value.trim() !== "");
const normalizePhrase = (phrase: string) =>
  phrase
    .trim()
    .toLowerCase()
    .split(/\s+/) // split by one or more spaces
    .filter(Boolean);
  const handleNext = async () => {
    if (!isAllField()) {
    toast.error("Please fill all the fields");
    return;
  }

  const inputNormalized = normalizePhrase(inputValues.join(" "));
  const secretNormalized = normalizePhrase(secretPhrase);

  if (inputNormalized.length !== secretNormalized.length) {
    toast.error("Incorrect phrase length");
    return;
  }

  // Check each word matches exactly in order
  for (let i = 0; i < secretNormalized.length; i++) {
    if (inputNormalized[i] !== secretNormalized[i]) {
      toast.error("Wrong confirm");
      return;
    }
  }
    setIsSubmit(true);
  };

  const handleClear = () => {
    setInputValues(Array(inputValues.length).fill(""));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <ToastContainer />
      <h1 className="text-3xl font-bold p-4 text-center text-primary">
        Enter The Secret Recovery Phrase
      </h1>

      <div className="grid grid-cols-3 gap-4 md:gap-8 m-2">
        {inputValues.map((value, index) => (
          <div
            key={index}
            className="flex items-center justify-center space-x-2"
          >
            <span className="text-secondary">{index + 1}.</span>
            <input
              type={showPasswords[index] ? "text" : "password"}
              value={value}
              onChange={(e) => {
                const newInputValues = [...inputValues];
                newInputValues[index] = e.target.value;
                setInputValues(newInputValues);
              }}
              onPaste={(e) => handlePaste(e, index)}
              className="border border-secondary p-2 rounded-lg w-full md:w-1/2 px-2 bg-white text-primary placeholder-secondary"
              placeholder="Enter word"
            />
            <button onClick={() => togglePasswordVisibility(index)} className="">
              {showPasswords[index] ? (
                <EyeIcon className="h-4 w-4 text-accent" />
              ) : (
                <EyeSlashIcon className="h-4 w-4 text-accent" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="flex m-4 gap-12">
        <button
          onClick={handleClear}
          className="text-secondary border border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/50 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 hover:bg-secondary/10"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="text-white bg-accent border-secondary hover:bg-accent/90 focus:outline-none focus:ring-4 focus:ring-accent/50 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};
