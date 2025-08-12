import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers,Mnemonic } from "ethers";
import CopyToClipboard from "react-copy-to-clipboard";

interface SecretRecoveryPhaseProps {
  setSecretPhrase:(phrase:string)=> void;
  onNext: () => void;
}

export const SecretRecoveryPhase: React.FC<SecretRecoveryPhaseProps> = ({
  setSecretPhrase,
  onNext,
}) => {
  const [mnemonics, setMnemonics] = useState("");
  const [seedPhraseVisible, setSeedPhraseVisible] = useState(false);
  const [seedPhraseCopied, setSeedPhraseCopied] = useState(false);

  const handleRevealSeedPhrase = () => {
    setSeedPhraseVisible(true);
    setTimeout(() => {
      setSeedPhraseVisible(false);
    }, 1000);
  };

  const generateMnemonic = async () => {
    try {
      const entropy = ethers.randomBytes(16);
      const mnemonic = Mnemonic.fromEntropy(entropy).phrase;
      setMnemonics(mnemonic);
      setSecretPhrase(mnemonic.toString());
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    generateMnemonic();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center overflow-y-hidden">
      <ToastContainer />
      <h1 className="text-3xl font-bold flex items-center justify-center text-center">
        Secret Recovery Phrase
      </h1>
      <p className="text-lg font-light px-4 py-2 flex items-center justify-center text-center">
        Write down this 12-word Secret Recovery Phrase and save it in a place
        that you trust and only you can access.
      </p>
      {seedPhraseVisible ? (
        <textarea
          name="secretPhrase"
          id="secretPhrase"
          cols={40}
          rows={2}
          value={mnemonics}
          readOnly
          className="m-2  outline-1 border border-gray-700 rounded-md p-4 flex "
        ></textarea>
      ) : (
        <div className="m-2 outline-1 border border-gray-700 rounded-md p-6 blur">
          Seed phrase will be revealed when you click `reveal the seed phrase.`
        </div>
      )}
      <div className="flex flex-row justify-end gap-16 m-2">
        <button
          className="flex flex-row gap-2 justify-center items-center"
          onClick={handleRevealSeedPhrase}
          disabled={seedPhraseVisible}
        >
          {seedPhraseVisible ? (
            <EyeSlashIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
          <h1 className="text-blue-500 text-xs">
            {seedPhraseVisible ? "Hide seed phrase" : "Reveal the seed phrase"}
          </h1>
        </button>
        <CopyToClipboard
          text={mnemonics}
          onCopy={() => {
            setSeedPhraseCopied(true);
            toast.success("Seed phrase copied to clipboard");
          }}
        >
          <button
            className="flex flex-row gap-2 justify-center items-center"
            disabled={!mnemonics}
          >
            <EyeIcon className="h-4 w-4" />
            <h1 className="text-blue-500 text-xs">
              {seedPhraseCopied ? "Copied!" : "Copy to clipboard"}
            </h1>
          </button>
        </CopyToClipboard>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={onNext}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next
        </button>
      </div>
    </div>
  );
};
