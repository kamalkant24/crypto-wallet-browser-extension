import React from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";

interface Stage {
  number: number;
  text: string;
}

interface StagesProps {
  currentStep: number;
  // Add a callback for stage click
}

export default function Stages({ currentStep }: StagesProps) {
  const stages: Stage[] = [
    { number: 1, text: "Enter SecretRecoveryPhrase" },
    { number: 2, text: "Password" },
  ];

  const navigate = useNavigate();
  return (
  <>
    <div className="relative z-10 flex flex-col justify-center items-center">
      <button className="mt-2" onClick={() => navigate("/")}>
        <ArrowLeftIcon className="h-6 w-6 text-accent" />
      </button>

      <div className="relative z-10 flex flex-row justify-between gap-10 items-center m-4">
        {stages.map((stage: Stage) => (
          <div
            key={stage.number}
            className="relative z-10 flex items-center justify-around"
            // onClick={() => onStageClick(stage.number)}
          >
            <div
              className={`
                h-16 w-16 rounded-full flex items-center justify-center border 
                ${stage.number === currentStep 
                  ? "bg-primary border-primary" 
                  : "bg-secondary border-secondary"}
              `}
            >
              <span
                className={`
                  font-semibold text-xl
                  ${stage.number === currentStep ? "text-white" : "text-primary"}
                `}
              >
                {stage.number}
              </span>
            </div>
          </div>
        ))}
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 transform bg-primary"></div>
      </div>
    </div>
  </>
);
}
