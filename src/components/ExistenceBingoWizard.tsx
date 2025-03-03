"use client";

import { useState, useEffect } from "react";
import { IntroductionStep } from "./wizard/IntroductionStep";
import { ConfigurationStep } from "./wizard/ConfigurationStep";
import { BingoCardStep } from "./wizard/BingoCardStep";
import Cookies from "js-cookie";

// Cookie name for storing configuration
const CONFIG_COOKIE_NAME = "existence-bingo-config";

// Default configuration
const defaultConfig = {
  hasSpouse: true,
  childCount: 2,
  siblingCount: 1,
  hasPet: true,
  seedInput: ""
};

export function ExistenceBingoWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [configData, setConfigData] = useState(defaultConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load configuration from cookies on initial render
  useEffect(() => {
    const savedConfig = Cookies.get(CONFIG_COOKIE_NAME);
    
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfigData(parsedConfig);
      } catch (error) {
        console.error("Error parsing saved configuration:", error);
        // If there's an error parsing, use default config
        setConfigData(defaultConfig);
      }
    }
    
    setIsLoaded(true);
  }, []);

  // Save configuration to cookies whenever it changes
  useEffect(() => {
    if (isLoaded) {
      Cookies.set(CONFIG_COOKIE_NAME, JSON.stringify(configData), { 
        expires: 365, // Store for 1 year
        sameSite: 'strict'
      });
    }
  }, [configData, isLoaded]);

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