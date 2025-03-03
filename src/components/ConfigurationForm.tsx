"use client";

import { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface ConfigData {
  hasSpouse: boolean;
  childCount: number;
  siblingCount: number;
  hasPet: boolean;
  seedInput: string;
}

interface ConfigurationFormProps {
  configData: ConfigData;
  onConfigChange: (newConfig: Partial<ConfigData>) => void;
  onSubmit?: () => void;
  submitButtonText?: string;
  compact?: boolean;
  showPrivacyNote?: boolean;
}

export function ConfigurationForm({ 
  configData, 
  onConfigChange, 
  onSubmit,
  submitButtonText = "Apply Changes",
  compact = false,
  showPrivacyNote = false
}: ConfigurationFormProps) {
  const textSize = compact ? "text-xs" : "text-sm";
  const spacing = compact ? "space-y-3" : "space-y-4";
  const marginBottom = compact ? "mb-3" : "mb-4";
  
  return (
    <div className="w-full">
      <div className={`grid grid-cols-2 gap-4 ${marginBottom}`}>
        <div>
          <Label htmlFor="spouse-toggle" className={`${textSize} font-medium`}>Spouse/partner</Label>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-muted-foreground">Have/plan to have</span>
            <Switch 
              id="spouse-toggle" 
              checked={configData.hasSpouse} 
              onCheckedChange={(checked) => onConfigChange({ hasSpouse: checked })} 
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="pet-toggle" className={`${textSize} font-medium`}>Pets</Label>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-muted-foreground">Have/plan to have</span>
            <Switch 
              id="pet-toggle" 
              checked={configData.hasPet} 
              onCheckedChange={(checked) => onConfigChange({ hasPet: checked })} 
            />
          </div>
        </div>
      </div>
      
      <div className={`${spacing} ${marginBottom}`}>
        <div>
          <div className="flex justify-between mb-1">
            <Label htmlFor="child-slider" className={`${textSize} font-medium`}>Children: {configData.childCount}</Label>
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
            <Label htmlFor="sibling-slider" className={`${textSize} font-medium`}>Siblings: {configData.siblingCount}</Label>
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
      
      <div className={`space-y-2 ${marginBottom}`}>
        <Label htmlFor="seed-input" className={`${textSize} font-medium`}>Your Personal Number</Label>
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
      
      {showPrivacyNote && (
        <div className={`bg-muted/30 p-3 rounded-md flex gap-2 items-start ${marginBottom}`}>
          <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Your information is only stored locally on your device.
          </p>
        </div>
      )}
      
      {onSubmit && (
        <Button 
          onClick={onSubmit} 
          className="w-full mt-2"
          disabled={!configData.seedInput.trim()}
        >
          {submitButtonText}
        </Button>
      )}
    </div>
  );
} 