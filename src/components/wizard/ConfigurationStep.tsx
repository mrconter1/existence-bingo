"use client";

import { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";

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
    <div className="space-y-6">
      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-bold mb-4">Personal Configuration</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="spouse-toggle" className="cursor-pointer">You have or plan to have a spouse/partner</Label>
            <Switch 
              id="spouse-toggle" 
              checked={configData.hasSpouse} 
              onCheckedChange={(checked) => onConfigChange({ hasSpouse: checked })} 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="child-slider">Number of children (current or planned): {configData.childCount}</Label>
            </div>
            <Slider 
              id="child-slider"
              min={0} 
              max={5} 
              step={1} 
              value={[configData.childCount]} 
              onValueChange={(value: number[]) => onConfigChange({ childCount: value[0] })} 
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="sibling-slider">Number of siblings (including step-siblings): {configData.siblingCount}</Label>
            </div>
            <Slider 
              id="sibling-slider"
              min={0} 
              max={5} 
              step={1} 
              value={[configData.siblingCount]} 
              onValueChange={(value: number[]) => onConfigChange({ siblingCount: value[0] })} 
              className="py-4"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="pet-toggle" className="cursor-pointer">You have or plan to have pets</Label>
            <Switch 
              id="pet-toggle" 
              checked={configData.hasPet} 
              onCheckedChange={(checked) => onConfigChange({ hasPet: checked })} 
            />
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="seed-input">Your Personal Number (or ID number)</Label>
            <Input 
              id="seed-input"
              type="text" 
              value={configData.seedInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onConfigChange({ seedInput: e.target.value })} 
              placeholder="Enter your personal number" 
            />
          </div>
        </div>
        
        <div className="mt-6 bg-muted/50 p-4 rounded-lg flex gap-3">
          <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Privacy Notice</p>
            <p>
              Your personal information is only stored locally on your device. We do not collect, store, 
              or transmit any of your data to our servers. Your personal number is only used as a seed to 
              generate your unique bingo board.
            </p>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!configData.seedInput.trim()}
        >
          Generate My Bingo Board
        </Button>
      </div>
    </div>
  );
} 