import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

interface Stage {
  number: number;
  text: string;
}

interface StagesProps {
  currentStep: number;
}

export default function Stages({ currentStep }: StagesProps) {
  const stages: Stage[] = [
    { number: 1, text: "Secret Recovery Phrase" },
    { number: 2, text: "Password" },
    { number: 3, text: "Confirm Recovery Phrase" },
  ];

  const navigate = useNavigate();

  return (
    <>
      <div className="relative z-10 flex flex-col justify-center items-center">
        <button className="mt-2" onClick={() => navigate("/")}>
          <ArrowLeftIcon className="h-6 w-6 text-accent" />
        </button>

        <div className="relative z-10 flex flex-row justify-between gap-10 items-center m-4 w-full max-w-md">
          {stages.map((stage: Stage) => (
            <div
              key={stage.number}
              className="relative z-10 flex items-center justify-around"
            >
              <div
                className={`
                  h-16 w-16 rounded-full flex items-center justify-center border
                  ${
                    stage.number === currentStep
                      ? "bg-accent border-accent"
                      : "bg-neutral-50 border-secondary"
                  }
                `}
              >
                <span
                  className={`
                    font-semibold text-xl
                    ${
                      stage.number === currentStep
                        ? "text-primary"
                        : "text-secondary"
                    }
                  `}
                >
                  {stage.number}
                </span>
              </div>
            </div>
          ))}
          <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 transform bg-accent"></div>
        </div>
      </div>
    </>
  );
}
