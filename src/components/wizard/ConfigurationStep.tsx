"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConfigurationForm, ConfigData } from "@/components/ConfigurationForm";

interface ConfigurationStepProps {
  configData: ConfigData;
  onConfigChange: (newConfig: Partial<ConfigData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ConfigurationStep({ 
  configData, 
  onConfigChange, 
  onNext, 
  onBack 
}: ConfigurationStepProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md mx-auto">
        <h3 className="text-lg font-bold mb-4 text-center">Personal Configuration</h3>
        
        <Card className="p-4 mb-4">
          <ConfigurationForm 
            configData={configData}
            onConfigChange={onConfigChange}
            showPrivacyNote={true}
          />
        </Card>
      </div>
      
      <div className="flex justify-between w-full max-w-md mt-3">
        <Button onClick={onBack} variant="outline" size="sm">
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!configData.seedInput.trim()}
          size="sm"
        >
          Generate Board
        </Button>
      </div>
    </div>
  );
} 