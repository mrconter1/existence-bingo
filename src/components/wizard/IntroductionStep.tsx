"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface IntroductionStepProps {
  onNext: () => void;
}

export function IntroductionStep({ onNext }: IntroductionStepProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-bold">Welcome to Existence Bingo</h3>
        
        <div className="space-y-3">
          <p>
            Existence Bingo is a thought-provoking exploration of life's unpredictable events and challenges. 
            Based on statistical probabilities, this application creates a personalized "bingo card" of life events 
            that you might experience during your lifetime.
          </p>
          
          <h4 className="text-lg font-semibold mt-4">How It Works</h4>
          <p>
            The application uses your personal number (like a national ID) as a seed to generate a unique 4x4 bingo board.
            Each square contains a life event with its statistical probability of occurring in an average lifetime.
          </p>
          
          <p>
            The events shown on your board are selected based on their real-world probability, adjusted for your family 
            configuration (spouse, children, siblings, pets). This creates a balanced experience where:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Some events are common (30%+ probability)</li>
            <li>Some events are moderately likely (10-30% probability)</li>
            <li>Some events are rare (less than 10% probability)</li>
          </ul>
          
          <h4 className="text-lg font-semibold mt-4">About Life-Long Probability</h4>
          <p>
            On average, the statistical probability of getting a "bingo" (completing a row, column, or diagonal on your card) 
            during your lifetime is around 30-40%. This reflects the balance between common and rare events, and the random 
            distribution of events on your board.
          </p>
          
          <p>
            The probabilities are approximate and based on available research data. They may vary based on many factors including 
            geography, socioeconomic status, and personal choices.
          </p>
        </div>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={onNext} size="lg">
          Next: Configure Your Card
        </Button>
      </div>
    </div>
  );
} 