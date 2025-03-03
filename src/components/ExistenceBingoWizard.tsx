"use client";

import { useState } from "react";
import { IntroductionStep } from "./wizard/IntroductionStep";
import { ConfigurationStep } from "./wizard/ConfigurationStep";
import { BingoCardStep } from "./wizard/BingoCardStep";

export function ExistenceBingoWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [configData, setConfigData] = useState({
    hasSpouse: true,
    childCount: 2,
    siblingCount: 1,
    hasPet: true,
    seedInput: ""
  });

  const handleConfigChange = (newConfig: Partial<typeof configData>) => {
    setConfigData(prev => ({ ...prev, ...newConfig }));
  };

  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 2));
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 rounded-lg bg-card flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Existence Bingo</h2>
        
        {/* Step indicators */}
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${currentStep >= 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            1
          </div>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            2
          </div>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            3
          </div>
        </div>
      </div>

      {/* Content container with centered content */}
      <div className="flex-1 flex flex-col justify-center">
        {currentStep === 0 && (
          <IntroductionStep onNext={goToNextStep} />
        )}
        
        {currentStep === 1 && (
          <ConfigurationStep 
            configData={configData}
            onConfigChange={handleConfigChange}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        
        {currentStep === 2 && (
          <BingoCardStep 
            configData={configData}
            onBack={goToPreviousStep}
          />
        )}
      </div>
    </div>
  );
} 