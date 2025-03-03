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
        <h3 className="text-lg font-bold mb-3 font-heading">Life&apos;s Bingo</h3>
        
        <p className="text-sm mb-5">
          A personalized bingo board of potential life misfortunes.
        </p>
        
        <Card className="bg-muted/30 p-4 rounded mb-5">
          <p className="text-sm">
            This board is uniquely generated based on your personal identifier and family situation. 
            Each square represents a potential life challenge with its probability adjusted to your circumstances.
          </p>
        </Card>
        
        <div className="bg-primary/10 border border-primary/20 rounded-md p-3 mb-5">
          <p className="text-sm font-medium">
            Statistically, about 35-40% of people will get a bingo on their board during their lifetime.
          </p>
        </div>
      </div>
      
      <div className="mt-3 w-full max-w-xs">
        <Button onClick={onNext} size="sm" className="w-full">
          Next: Configure Your Card
        </Button>
      </div>
    </div>
  );
} 