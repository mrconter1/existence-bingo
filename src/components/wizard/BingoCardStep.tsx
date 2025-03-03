"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Misfortune, baseMisfortunes } from "@/data/misfortunes";
import { SeededRandom } from "@/utils/random";

interface ConfigData {
  hasSpouse: boolean;
  childCount: number;
  siblingCount: number;
  hasPet: boolean;
  seedInput: string;
}

interface BingoCardStepProps {
  configData: ConfigData;
  onBack: () => void;
}

export function BingoCardStep({ configData, onBack }: BingoCardStepProps) {
  const [bingoItems, setBingoItems] = useState<Misfortune[]>([]);
  const [hasBingo, setHasBingo] = useState(false);
  const [expectedEvents, setExpectedEvents] = useState(0);

  useEffect(() => {
    generateBingoCard();
  }, [configData]);

  const getAdjustedMisfortunes = (): Misfortune[] => {
    // Filter and adjust probabilities based on family configuration
    const adjustedMisfortunes = baseMisfortunes.map(item => {
      let adjustedProbability = item.probability;
      
      // Adjust spouse-related events
      if (item.text.includes("spouse") && !configData.hasSpouse) {
        adjustedProbability = 0;
      }
      
      // Adjust child-related events
      if (item.text.includes("child") && configData.childCount === 0) {
        adjustedProbability = 0;
      } else if (item.text.includes("child") && configData.childCount > 0) {
        adjustedProbability = calculateAdjustedProbability(item.probability, configData.childCount);
      }
      
      // Adjust sibling-related events
      if (item.text.includes("sibling") && configData.siblingCount === 0) {
        adjustedProbability = 0;
      } else if (item.text.includes("sibling") && configData.siblingCount > 0) {
        adjustedProbability = calculateAdjustedProbability(item.probability, configData.siblingCount);
      }
      
      // Adjust pet-related events
      if (item.text.includes("pet") && !configData.hasPet) {
        adjustedProbability = 0;
      }
      
      return { ...item, probability: adjustedProbability };
    }).filter(item => item.probability > 0);
    
    // Sort by probability (descending)
    return adjustedMisfortunes.sort((a, b) => b.probability - a.probability);
  };
  
  const calculateAdjustedProbability = (baseProbability: number, count: number): number => {
    // Increase probability based on number of family members, but with diminishing returns
    return Math.min(baseProbability * (1 + 0.5 * Math.log(count + 1)), 99);
  };

  const generateBingoCard = () => {
    // Set seed from input - sanitize by removing non-numeric characters first
    const sanitizedInput = configData.seedInput.replace(/[^0-9]/g, '');
    const seedNumber = parseInt(sanitizedInput) || Math.floor(Math.random() * 1000000);
    
    // Create seeded random generator
    const random = new SeededRandom(seedNumber);
    
    const allMisfortunes = getAdjustedMisfortunes();
    const bingoCard: Misfortune[] = [];
    
    // Calculate lifetime misfortune expectation
    const totalProbability = allMisfortunes.reduce((sum, item) => sum + item.probability, 0);
    const averageMisfortunes = totalProbability / 100; // Expected number in a lifetime
    setExpectedEvents(averageMisfortunes);
    
    // Create probability buckets for a balanced card
    const highProb = allMisfortunes.filter(m => m.probability >= 30);
    const mediumProb = allMisfortunes.filter(m => m.probability >= 10 && m.probability < 30);
    const lowProb = allMisfortunes.filter(m => m.probability < 10);
    
    // Use seeded random for shuffling
    const shuffleAndSlice = (arr: any[], count: number) => {
      return random.shuffle(arr).slice(0, count);
    };
    
    // Select misfortunes from each probability bucket
    const highItems = shuffleAndSlice(highProb, 7);  // More high probability items
    const mediumItems = shuffleAndSlice(mediumProb, 6); 
    const lowItems = shuffleAndSlice(lowProb, 3);  // Fewer low probability items
    
    // Strategic placement for bingo chances
    const allItems = [...highItems, ...mediumItems, ...lowItems];
    allItems.sort(() => random.next() - 0.5); // Shuffle all items with seed
    
    // Create a 4x4 grid with all spaces filled with misfortunes
    for (let i = 0; i < 16; i++) {
      if (i < allItems.length) {
        bingoCard.push({...allItems[i], checked: false});
      } else {
        // Fallback in case we don't have enough items
        bingoCard.push({ text: "You have experienced an unexpected misfortune", probability: 5, checked: false });
      }
    }
    
    // Make sure at least one line has a good chance of bingo
    const ensureWinnableLine = () => {
      // Possible winning lines (rows, columns, diagonals)
      const lines = [
        [0, 1, 2, 3],       // row 1
        [4, 5, 6, 7],       // row 2
        [8, 9, 10, 11],     // row 3
        [12, 13, 14, 15],   // row 4
        [0, 4, 8, 12],      // column 1
        [1, 5, 9, 13],      // column 2
        [2, 6, 10, 14],     // column 3
        [3, 7, 11, 15],     // column 4
        [0, 5, 10, 15],     // diagonal 1
        [3, 6, 9, 12]       // diagonal 2
      ];
      
      // Choose a random line to make more winnable
      const lineIndex = random.nextInt(0, lines.length - 1);
      const chosenLine = lines[lineIndex];
      
      // Ensure this line has higher probability events
      const highProbItems = allMisfortunes.filter(m => m.probability >= 40);
      if (highProbItems.length >= 4) {
        const selectedHighProb = random.shuffle(highProbItems).slice(0, 4);
        
        // Place these high probability items in the chosen line
        for (let i = 0; i < chosenLine.length; i++) {
          if (i < selectedHighProb.length) {
            bingoCard[chosenLine[i]] = {...selectedHighProb[i], checked: false};
          }
        }
      }
    };
    
    // Only try to ensure a winnable line if we have enough items
    if (allMisfortunes.length >= 16) {
      ensureWinnableLine();
    }
    
    setBingoItems(bingoCard);
    checkForBingo();
  };

  const toggleChecked = (index: number) => {
    const newItems = [...bingoItems];
    newItems[index] = { ...newItems[index], checked: !newItems[index].checked };
    setBingoItems(newItems);
    
    // Check for bingo after toggling
    setTimeout(() => {
      checkForBingo();
    }, 100);
  };

  const checkForBingo = () => {
    // Define all possible bingo lines (rows, columns, diagonals)
    const lines = [
      [0, 1, 2, 3],       // row 1
      [4, 5, 6, 7],       // row 2
      [8, 9, 10, 11],     // row 3
      [12, 13, 14, 15],   // row 4
      [0, 4, 8, 12],      // column 1
      [1, 5, 9, 13],      // column 2
      [2, 6, 10, 14],     // column 3
      [3, 7, 11, 15],     // column 4
      [0, 5, 10, 15],     // diagonal 1
      [3, 6, 9, 12]       // diagonal 2
    ];
    
    // Check each line for bingo
    for (const line of lines) {
      if (line.every(index => bingoItems[index]?.checked)) {
        setHasBingo(true);
        return;
      }
    }
    
    setHasBingo(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-2 text-center">Your Life Events Bingo Card</h3>
        <p className="text-sm text-muted-foreground mb-2 text-center">
          Mark off the events you've experienced in your life!
        </p>
        <p className="text-xs text-muted-foreground mb-6 text-center">
          This board is uniquely generated based on your personal number and family configuration.
          Share your personal number with friends to compare the same board!
        </p>
        
        {hasBingo && (
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 mb-6 rounded-lg text-center animate-pulse">
            <h4 className="text-lg font-bold">BINGO!</h4>
            <p>You've completed a line of life's challenges!</p>
          </div>
        )}
        
        <div className="grid grid-cols-4 gap-2 mb-6">
          {bingoItems.map((item, index) => (
            <Card 
              key={index} 
              className={`p-2 text-xs h-24 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
                ${item.checked 
                  ? "bg-primary/20 border-primary" 
                  : "hover:bg-accent"}`}
              onClick={() => toggleChecked(index)}
            >
              <span className={item.checked ? "line-through opacity-70" : ""}>{item.text}</span>
              <span className="block mt-1 text-muted-foreground text-xs">
                ({item.probability.toFixed(1)}%)
              </span>
            </Card>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground text-center mb-4">
          Based on your configuration, you might experience about {expectedEvents.toFixed(1)} of these events in your lifetime.
        </p>
      </Card>
      
      <div className="flex justify-start">
        <Button onClick={onBack} variant="outline">
          Back to Configuration
        </Button>
      </div>
    </div>
  );
} 