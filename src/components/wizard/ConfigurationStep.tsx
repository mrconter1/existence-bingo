"use client";

import { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ConfigData {
  hasSpouse: boolean;
  childCount: number;
  siblingCount: number;
  hasPet: boolean;
  seedInput: string;
}

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
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="spouse-toggle" className="text-sm font-medium">Spouse/partner</Label>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">Have/plan to have</span>
                <Switch 
                  id="spouse-toggle" 
                  checked={configData.hasSpouse} 
                  onCheckedChange={(checked) => onConfigChange({ hasSpouse: checked })} 
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="pet-toggle" className="text-sm font-medium">Pets</Label>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">Have/plan to have</span>
                <Switch 
                  id="pet-toggle" 
                  checked={configData.hasPet} 
                  onCheckedChange={(checked) => onConfigChange({ hasPet: checked })} 
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-4">
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="child-slider" className="text-sm font-medium">Children: {configData.childCount}</Label>
              </div>
              <Slider 
                id="child-slider"
                min={0} 
                max={5} 
                step={1} 
                value={[configData.childCount]} 
                onValueChange={(value: number[]) => onConfigChange({ childCount: value[0] })} 
                className="py-1"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="sibling-slider" className="text-sm font-medium">Siblings: {configData.siblingCount}</Label>
              </div>
              <Slider 
                id="sibling-slider"
                min={0} 
                max={5} 
                step={1} 
                value={[configData.siblingCount]} 
                onValueChange={(value: number[]) => onConfigChange({ siblingCount: value[0] })} 
                className="py-1"
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="seed-input" className="text-sm font-medium">Your Personal Number</Label>
            <p className="text-xs text-muted-foreground">
              Used as a seed. Same number = same board.
            </p>
            <Input 
              id="seed-input"
              type="text" 
              value={configData.seedInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onConfigChange({ seedInput: e.target.value })} 
              placeholder="Enter your personal number" 
            />
          </div>
          
          <div className="bg-muted/30 p-3 rounded-md flex gap-2 items-start">
            <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Your information is only stored locally on your device.
            </p>
          </div>
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