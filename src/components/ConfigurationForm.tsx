"use client";

import { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Info } from "lucide-react";
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
  const textSize = compact 
    ? "text-xs" 
    : "text-sm md:text-base";
  const spacing = compact 
    ? "space-y-2" 
    : "space-y-4 md:space-y-5";
  const marginBottom = compact 
    ? "mb-2" 
    : "mb-4 md:mb-5";
  const buttonSize = compact 
    ? "h-7 text-xs" 
    : "md:h-10 md:text-base";
  
  return (
    <div className="w-full">
      <div className={`grid grid-cols-1 gap-2 md:gap-3 ${marginBottom}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 md:gap-2">
            <Label htmlFor="spouse-toggle" className={`${textSize} font-medium`}>Spouse/partner</Label>
            <div className="relative group">
              <Info className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground cursor-help" />
              <div className="absolute left-0 top-full mt-1 w-64 bg-popover text-popover-foreground text-xs p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                You have or are planning to have a spouse/partner
              </div>
            </div>
          </div>
          <Switch 
            id="spouse-toggle" 
            checked={configData.hasSpouse} 
            onCheckedChange={(checked) => onConfigChange({ hasSpouse: checked })} 
            className="md:scale-110"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 md:gap-2">
            <Label htmlFor="pet-toggle" className={`${textSize} font-medium`}>Pets</Label>
            <div className="relative group">
              <Info className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground cursor-help" />
              <div className="absolute left-0 top-full mt-1 w-64 bg-popover text-popover-foreground text-xs p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                You have or are planning to have pets
              </div>
            </div>
          </div>
          <Switch 
            id="pet-toggle" 
            checked={configData.hasPet} 
            onCheckedChange={(checked) => onConfigChange({ hasPet: checked })} 
            className="md:scale-110"
          />
        </div>
      </div>
      
      <div className={`${spacing} ${marginBottom}`}>
        <div>
          <div className="flex justify-between mb-1 md:mb-2">
            <div className="flex items-center gap-1 md:gap-2">
              <Label htmlFor="child-slider" className={`${textSize} font-medium`}>Children: {configData.childCount}</Label>
              <div className="relative group">
                <Info className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground cursor-help" />
                <div className="absolute left-0 top-full mt-1 w-64 bg-popover text-popover-foreground text-xs p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  You have or are planning to have this many children
                </div>
              </div>
            </div>
          </div>
          <Slider 
            id="child-slider"
            min={0} 
            max={5} 
            step={1} 
            value={[configData.childCount]} 
            onValueChange={(value: number[]) => onConfigChange({ childCount: value[0] })} 
            className="py-1 md:py-2"
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1 md:mb-2">
            <div className="flex items-center gap-1 md:gap-2">
              <Label htmlFor="sibling-slider" className={`${textSize} font-medium`}>Siblings: {configData.siblingCount}</Label>
              <div className="relative group">
                <Info className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground cursor-help" />
                <div className="absolute left-0 top-full mt-1 w-64 bg-popover text-popover-foreground text-xs p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  You have this many siblings
                </div>
              </div>
            </div>
          </div>
          <Slider 
            id="sibling-slider"
            min={0} 
            max={5} 
            step={1} 
            value={[configData.siblingCount]} 
            onValueChange={(value: number[]) => onConfigChange({ siblingCount: value[0] })} 
            className="py-1 md:py-2"
          />
        </div>
      </div>
      
      <div className={`space-y-1 md:space-y-2 ${marginBottom}`}>
        <div className="flex items-center gap-1 md:gap-2">
          <Label htmlFor="seed-input" className={`${textSize} font-medium`}>Personal Identifier</Label>
          <div className="relative group">
            <Info className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground cursor-help" />
            <div className="absolute left-0 top-full mt-1 w-64 bg-popover text-popover-foreground text-xs p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              Enter any personal identifier (number, name, etc.) to generate your unique board. Using the same identifier will always create the same board.
            </div>
          </div>
        </div>
        <Input 
          id="seed-input"
          type="text" 
          value={configData.seedInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onConfigChange({ seedInput: e.target.value })} 
          placeholder="Enter personal number, name, or any ID" 
          className={compact ? "h-7 text-xs" : "md:h-10 md:text-base"}
        />
      </div>
      
      {showPrivacyNote && (
        <div className={`bg-muted/30 p-2 md:p-3 rounded-md flex gap-2 items-start ${marginBottom}`}>
          <AlertCircle className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-muted-foreground">
            Your information is only stored locally on your device.
          </p>
        </div>
      )}
      
      {onSubmit && (
        <Button 
          onClick={onSubmit} 
          className={buttonSize}
          size={compact ? "sm" : "default"}
        >
          {submitButtonText}
        </Button>
      )}
    </div>
  );
} 