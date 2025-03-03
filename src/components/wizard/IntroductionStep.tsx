"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface IntroductionStepProps {
  onNext: () => void;
}

export function IntroductionStep({ onNext }: IntroductionStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="max-w-md mx-auto">
        <h3 className="text-lg font-bold mb-3">Life's Bingo</h3>
        
        <p className="text-sm mb-5">
          A personalized bingo board of potential life misfortunes.
        </p>
        
        <Card className="bg-muted/30 p-4 rounded mb-5">
          <p className="text-sm">
            Your personal number and family configuration create a unique board 
            based on statistical probabilities of various life challenges.
          </p>
        </Card>
      </div>
      
      <div className="mt-3 w-full max-w-xs">
        <Button onClick={onNext} size="sm" className="w-full">
          Next: Configure Your Card
        </Button>
      </div>
    </div>
  );
} 