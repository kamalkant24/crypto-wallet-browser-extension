import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { SecretRecoveryPhase } from "./security-phrase";
import { useLogin } from "@/providers/LoginProvider";
import { Password } from "./password";
import { RotatingLines } from "react-loader-spinner";

import Stages from "./stages";
import { ConfirmSecretRecoveryPhase } from "./confirm-security-phrase";
import { toast } from "react-toastify";

export default function ImportExisting() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [secretPhrase, setSecretPhrase] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const { isSignup, signup, isLoggedIn, localPassword } = useLogin();

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
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (isSubmit) {
      handleSubmit();
    }
  }, [isSubmit]);

  const handlePrevStep = () => {
    setStep(step - 1);
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
        return <Password setPassword={setPassword} onNext={handleNextStep} />;
      case 3:
        return (
          <ConfirmSecretRecoveryPhase
            secretPhrase={secretPhrase}
            setIsSubmit={setIsSubmit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-primary h-screen md:flex md:flex-col md:justify-center md:h-[768px] md:w-[768px] md:rounded-lg">
      {isLoading ? (
        <RotatingLines
          strokeColor="#F1C40F" // accent color hex from tailwind config
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
