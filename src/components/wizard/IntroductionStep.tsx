"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface IntroductionStepProps {
  onNext: () => void;
}

export function IntroductionStep({ onNext }: IntroductionStepProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md mx-auto">
        <h3 className="text-lg font-bold mb-4 text-center">Welcome to Life's Bingo</h3>
        
        <Card className="p-4 mb-4">
          <p className="mb-4">
            This is simply a reflection of what life is. A personalized bingo board based on the challenges we all face.
          </p>
          
          <p className="mb-4">
            Configure your board based on your life situation, and we'll generate a unique 4x4 grid of potential life challenges.
          </p>
          
          <p className="mb-4">
            Mark off events you've experienced. Get four in a row to achieve bingo!
          </p>
          
          <p className="mb-4">
            On average, people will check about 9 tiles on their board. Those with larger families might check more. How will you compare?
          </p>
          
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> All data stays in your browser. Nothing is sent to any server.
          </p>
        </Card>
      </div>
      
      <div className="flex justify-end w-full max-w-md mt-3">
        <Button onClick={onNext} size="sm">
          Continue
        </Button>
      </div>
    </div>
  );
} 