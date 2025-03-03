"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Misfortune, baseMisfortunes } from "@/data/misfortunes";
import { SeededRandom } from "@/utils/random";
import Cookies from "js-cookie";
import { Settings } from "lucide-react";

// Cookie name for storing bingo state
const BINGO_STATE_COOKIE_NAME = "existence-bingo-state";

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
  onOpenSettings: () => void;
}

export function BingoCardStep({ configData, onBack, onOpenSettings }: BingoCardStepProps) {
  const [bingoItems, setBingoItems] = useState<Misfortune[]>([]);
  const [hasBingo, setHasBingo] = useState(false);
  const [expectedEvents, setExpectedEvents] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate bingo card on initial render or when config changes
  useEffect(() => {
    generateBingoCard();
  }, [configData]);

  // Load checked state from cookies after generating the card
  useEffect(() => {
    if (bingoItems.length > 0 && !isLoaded) {
      loadBingoState();
      setIsLoaded(true);
    }
  }, [bingoItems]);

  // Save bingo state to cookies whenever it changes
  useEffect(() => {
    if (isLoaded && bingoItems.length > 0) {
      saveBingoState();
    }
  }, [bingoItems, isLoaded]);

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
    setIsLoaded(false); // Reset isLoaded to trigger loading from cookies
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

  // Save the current state of checked items to cookies
  const saveBingoState = () => {
    // Create a cookie key based on the seed to ensure different boards have different saved states
    const sanitizedInput = configData.seedInput.replace(/[^0-9]/g, '');
    const cookieKey = `${BINGO_STATE_COOKIE_NAME}-${sanitizedInput}`;
    
    // Save only the checked state of each item
    const checkedState = bingoItems.map(item => item.checked || false);
    
    Cookies.set(cookieKey, JSON.stringify(checkedState), { 
      expires: 365, // Store for 1 year
      sameSite: 'strict'
    });
  };

  // Load the checked state from cookies
  const loadBingoState = () => {
    const sanitizedInput = configData.seedInput.replace(/[^0-9]/g, '');
    const cookieKey = `${BINGO_STATE_COOKIE_NAME}-${sanitizedInput}`;
    
    const savedState = Cookies.get(cookieKey);
    
    if (savedState) {
      try {
        const checkedState = JSON.parse(savedState);
        
        // Apply the saved checked state to the current bingo items
        if (Array.isArray(checkedState) && checkedState.length === bingoItems.length) {
          const updatedItems = bingoItems.map((item, index) => ({
            ...item,
            checked: checkedState[index]
          }));
          
          setBingoItems(updatedItems);
          
          // Check for bingo after loading state
          setTimeout(() => {
            checkForBingo();
          }, 100);
        }
      } catch (error) {
        console.error("Error parsing saved bingo state:", error);
      }
    }
  };

  // Reset the bingo board (clear all checked items)
  const resetBingoBoard = () => {
    const newItems = bingoItems.map(item => ({ ...item, checked: false }));
    setBingoItems(newItems);
    setHasBingo(false);
  };

  return (
    <div className="flex flex-col h-full w-full justify-center">
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex flex-col space-y-1 mb-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Life Events Bingo</h3>
            <div className="flex items-center gap-2">
              {hasBingo && (
                <div className="bg-primary/20 border border-primary px-2 py-0.5 rounded-full text-xs font-medium animate-pulse">
                  BINGO!
                </div>
              )}
              <Settings 
                className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                onClick={onOpenSettings}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Mark off events you've experienced
          </p>
        </div>
        
        {/* Bingo board */}
        <div className="w-full aspect-square mb-3">
          <div className="grid grid-cols-4 grid-rows-4 gap-1 h-full">
            {bingoItems.map((item, index) => (
              <Card 
                key={index} 
                className={`p-1 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
                  ${item.checked 
                    ? "bg-primary/20 border-primary" 
                    : "hover:bg-accent"}`}
                onClick={() => toggleChecked(index)}
              >
                <span className={`text-[0.65rem] leading-tight ${item.checked ? "line-through opacity-70" : ""}`}>
                  {item.text}
                </span>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="w-full flex justify-between">
          <Button onClick={onBack} variant="outline" size="sm" className="h-8 text-xs px-3">
            Back
          </Button>
          <Button onClick={resetBingoBoard} variant="outline" size="sm" className="h-8 text-xs px-3">
            Reset Board
          </Button>
        </div>
      </div>
    </div>
  );
} 