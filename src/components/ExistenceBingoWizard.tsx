"use client";

import { useState, useEffect } from "react";
import { IntroductionStep } from "./wizard/IntroductionStep";
import { ConfigurationStep } from "./wizard/ConfigurationStep";
import { BingoCardStep } from "./wizard/BingoCardStep";
import Cookies from "js-cookie";
import { X, Settings, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { ConfigurationForm } from "@/components/ConfigurationForm";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

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

  const applyConfigChanges = () => {
    // Show success message
    setSaveSuccess(true);
    
    // Regenerate the board with new config
    setCurrentStep(2);
    
    // Hide success message after 2 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
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
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto p-4">
          <DialogHeader className="pb-2">
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          
          <div className="flex gap-4">
            {/* Configuration Options - Left Side */}
            <div className="flex-1 py-2">
              <h3 className="text-sm font-medium mb-2">Configuration</h3>
              
              <ConfigurationForm 
                configData={configData}
                onConfigChange={handleConfigChange}
                onSubmit={applyConfigChanges}
                submitButtonText="Apply"
                compact={true}
              />
              
              {saveSuccess && (
                <div className="mt-2 flex items-center gap-2 text-green-600 text-xs animate-in fade-in">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Changes applied!</span>
                </div>
              )}
            </div>
            
            {/* Vertical Separator */}
            <div className="w-px bg-border"></div>
            
            {/* Danger Zone - Right Side */}
            <div className="w-1/3 py-2">
              <h3 className="text-sm font-medium mb-2 text-destructive">Danger Zone</h3>
              
              {!showDeleteConfirm ? (
                <>
                  <p className="text-xs text-muted-foreground mb-2">
                    Delete all your configuration and bingo progress. This cannot be undone.
                  </p>
                  
                  <Button 
                    onClick={() => setShowDeleteConfirm(true)} 
                    variant="destructive" 
                    className="w-full justify-center text-xs h-8"
                    size="sm"
                  >
                    <X className="mr-1 h-3 w-3" />
                    Delete Data
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-destructive font-medium">Are you sure?</p>
                  <div className="flex flex-col gap-2">
                    <Button 
                      onClick={deleteAllData} 
                      variant="destructive" 
                      className="w-full text-xs h-7"
                      size="sm"
                    >
                      Yes, Delete
                    </Button>
                    <Button 
                      onClick={() => setShowDeleteConfirm(false)} 
                      variant="outline" 
                      className="w-full text-xs h-7"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="pt-2">
            <Button 
              variant="secondary" 
              onClick={() => {
                setShowSettings(false);
                setShowDeleteConfirm(false);
              }}
              className="text-xs h-7"
              size="sm"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 