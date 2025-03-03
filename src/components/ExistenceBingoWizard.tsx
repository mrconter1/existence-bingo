"use client";

import { useState, useEffect } from "react";
import { IntroductionStep } from "./wizard/IntroductionStep";
import { ConfigurationStep } from "./wizard/ConfigurationStep";
import { BingoCardStep } from "./wizard/BingoCardStep";
import Cookies from "js-cookie";
import { Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Cookie name for storing configuration
const CONFIG_COOKIE_NAME = "existence-bingo-config";
const BINGO_STATE_PREFIX = "existence-bingo-state";

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
  const [showSettings, setShowSettings] = useState(false);

  // Load configuration from cookies on initial render
  useEffect(() => {
    const savedConfig = Cookies.get(CONFIG_COOKIE_NAME);
    
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfigData(parsedConfig);
        
        // If we have a valid seed, go directly to the bingo board
        if (parsedConfig.seedInput && parsedConfig.seedInput.trim() !== "") {
          setCurrentStep(2);
        }
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

  const goToConfig = () => {
    setCurrentStep(1);
    setShowSettings(false);
  };

  const deleteAllData = () => {
    // Delete configuration cookie
    Cookies.remove(CONFIG_COOKIE_NAME);
    
    // Delete all bingo state cookies
    Object.keys(Cookies.get()).forEach(cookieName => {
      if (cookieName.startsWith(BINGO_STATE_PREFIX)) {
        Cookies.remove(cookieName);
      }
    });
    
    // Reset to default state
    setConfigData(defaultConfig);
    setCurrentStep(0);
    setShowSettings(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-3 rounded-lg bg-card flex flex-col h-full">
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
            onOpenSettings={() => setShowSettings(true)}
          />
        )}
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Button 
              onClick={goToConfig} 
              variant="outline" 
              className="w-full justify-start"
            >
              <Settings className="mr-2 h-4 w-4" />
              Edit Configuration
            </Button>
            
            <Button 
              onClick={deleteAllData} 
              variant="destructive" 
              className="w-full justify-start"
            >
              <X className="mr-2 h-4 w-4" />
              Delete My Data
            </Button>
          </div>
          <DialogFooter>
            <Button 
              variant="secondary" 
              onClick={() => setShowSettings(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 