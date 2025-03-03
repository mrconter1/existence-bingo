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
        <h3 className="text-lg font-bold mb-3">Welcome to Existence Bingo</h3>
        
        <p className="text-sm mb-5">
          A personalized "bingo card" of life events based on statistical probabilities. 
          Mark events you've experienced and see if you get a bingo!
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-5">
          <Card className="bg-muted/30 p-3 rounded">
            <h4 className="text-sm font-semibold mb-2">How It Works</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-left">
              <li>Personal number creates your unique board</li>
              <li>Events based on real-world probabilities</li>
              <li>Family configuration adjusts probabilities</li>
            </ul>
          </Card>
          
          <Card className="bg-muted/30 p-3 rounded">
            <h4 className="text-sm font-semibold mb-2">Probability Ranges</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-left">
              <li>Common events (30%+)</li>
              <li>Moderate events (10-30%)</li>
              <li>Rare events (under 10%)</li>
            </ul>
          </Card>
        </div>
        
        <p className="text-xs text-muted-foreground mb-5">
          The chance of getting a "bingo" in your lifetime is around 30-40%. Probabilities are approximate 
          and based on available research.
        </p>
      </div>
      
      <div className="mt-3 w-full max-w-xs">
        <Button onClick={onNext} size="sm" className="w-full">
          Next: Configure Your Card
        </Button>
      </div>
    </div>
  );
} 