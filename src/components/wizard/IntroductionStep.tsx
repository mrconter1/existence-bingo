"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface IntroductionStepProps {
  onNext: () => void;
}

export function IntroductionStep({ onNext }: IntroductionStepProps) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-2">Welcome to Existence Bingo</h3>
        
        <p className="text-sm mb-3">
          A personalized "bingo card" of life events based on statistical probabilities. 
          Mark events you've experienced and see if you get a bingo!
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-muted/30 p-2 rounded">
            <h4 className="text-sm font-semibold mb-1">How It Works</h4>
            <ul className="list-disc pl-4 space-y-0.5 text-xs">
              <li>Personal number creates your unique board</li>
              <li>Events based on real-world probabilities</li>
              <li>Family configuration adjusts probabilities</li>
            </ul>
          </div>
          
          <div className="bg-muted/30 p-2 rounded">
            <h4 className="text-sm font-semibold mb-1">Probability Ranges</h4>
            <ul className="list-disc pl-4 space-y-0.5 text-xs">
              <li>Common events (30%+)</li>
              <li>Moderate events (10-30%)</li>
              <li>Rare events (under 10%)</li>
            </ul>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          The chance of getting a "bingo" in your lifetime is around 30-40%. Probabilities are approximate 
          and based on available research.
        </p>
      </div>
      
      <div className="mt-3">
        <Button onClick={onNext} size="sm">
          Next: Configure Your Card
        </Button>
      </div>
    </div>
  );
} 