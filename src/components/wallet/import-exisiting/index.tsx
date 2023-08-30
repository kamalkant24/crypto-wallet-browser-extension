import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { SecretRecoveryPhase } from "./secret-recovery-phrase";

import { Password } from "./password";
import { mnemonicToSeed } from "ethers/lib/utils";
import Stages from "./stages";
import { useLogin } from "@/providers/LoginProvider";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

export default function ImportExisting() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, isSignup, login, signup, localPassword } = useLogin();
  const [password, setPassword] = useState<string | null>(null);
  const [secretPhrase, setSecretPhrase] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {}, [isLoggedIn, isSignup, isLoading]);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    try {
      if (password === null) {
        toast.error("Something is wrong");
        return;
      }
      setIsLoading(true);
      const isAuth = await signup(secretPhrase, password);
      if (isAuth) {
        navigate("/home");
      } else {
        toast.error("Something went wrong in the validation");
        setIsLoading(false);
      }
    } catch (error) {
      //console.error("An error occurred:", error);
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     if (password === null) {
  //       toast.error("Something is wrong");
  //       return;
  //     }

  //     setIsLoading(true);

  //     const isAuth = await signup(secretPhrase, password);

  //     if (isAuth) {
  //       // Wait for isLoggedIn to become true before navigating
  //       const checkLoggedInInterval = setInterval(() => {
  //         if (isLoggedIn) {
  //           clearInterval(checkLoggedInInterval); // Stop checking
  //           setIsLoading(false);
  //           navigate("/home");
  //         }
  //       }, 100); // Check every 100 milliseconds
  //     } else {
  //       toast.error("Something went wrong in the validation");
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     //console.error("An error occurred:", error);
  //     setIsLoading(false);
  //     toast.error("An error occurred. Please try again.");
  //   }
  // };

  useEffect(() => {
    if (isSubmit) {
      setIsLoading(true);
      handleSubmit();
    }
  }, [isSubmit]);

  const handleStageClick = (stepNumber: number) => {
    if (stepNumber < step) {
      setStep(stepNumber);
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <SecretRecoveryPhase
            setSecretPhrase={setSecretPhrase}
            onNext={handleNextStep}
          />
        );
      case 2:
        return <Password setPassword={setPassword} setIsSubmit={setIsSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0d0d0d] h-screen  flex flex-col justify-center items-center md:h-[768px] md:w-[768px] md:rounded-lg">
      <ToastContainer />
      {isLoading ? (
        <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      ) : (
        <>
          <Stages currentStep={step} />
          {renderForm()}
        </>
      )}
    </div>
  );
}
