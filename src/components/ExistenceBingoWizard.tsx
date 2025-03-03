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
    <div className="w-full max-w-3xl mx-auto p-8 rounded-lg bg-card">
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Existence Bingo</h2>
      
      {/* Step indicators */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 0 ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground text-muted-foreground"}`}>
            1
          </div>
          <div className={`w-16 h-1 ${currentStep >= 1 ? "bg-primary" : "bg-muted-foreground/30"}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground text-muted-foreground"}`}>
            2
          </div>
          <div className={`w-16 h-1 ${currentStep >= 2 ? "bg-primary" : "bg-muted-foreground/30"}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground text-muted-foreground"}`}>
            3
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="min-h-[400px]">
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