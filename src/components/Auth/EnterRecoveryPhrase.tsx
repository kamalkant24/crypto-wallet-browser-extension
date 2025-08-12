import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EnterRecoveryPhrase() {
  const numberOfRows = 4;
  const inputsPerRow = 3;
  const totalInputs = numberOfRows * inputsPerRow;

  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState<string[]>(
    Array(totalInputs).fill("")
  );
  const [showPasswords, setShowPasswords] = useState<boolean[]>(
    Array(totalInputs).fill(false)
  );

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
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

  return (
    <div className="flex flex-col justify-center items-center bg-primary min-h-screen text-accent">
      <h1 className="text-3xl font-bold p-4 text-center text-accent">
        Enter The Secret Recovery Phrase
      </h1>

      <div className="grid grid-cols-3 gap-4 m-2">
        {inputValues.map((value, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-accent">{index + 1}.</span>
            <input
              type={showPasswords[index] ? "text" : "password"}
              value={value}
              onChange={(e) => {
                const newInputValues = [...inputValues];
                newInputValues[index] = e.target.value;
                setInputValues(newInputValues);
              }}
              onPaste={(e) => handlePaste(e, index)}
              className="border border-accent p-2 rounded-lg w-full px-2 bg-secondary text-white placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={() => togglePasswordVisibility(index)}
              className="text-accent hover:text-white"
            >
              {showPasswords[index] ? (
                <EyeIcon className="h-4 w-4" />
              ) : (
                <EyeSlashIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div>
        <button
          type="button"
          onClick={() => navigate("/new-password")}
          className="text-primary bg-accent hover:bg-secondary hover:text-white focus:outline-none focus:ring-4 focus:ring-accent font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
