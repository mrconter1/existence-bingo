"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Misfortune, baseMisfortunes } from "@/data/misfortunes";
import { SeededRandom } from "@/utils/random";
import Cookies from "js-cookie";
import { Settings } from "lucide-react";
import { ConfettiCelebration } from "@/components/ConfettiCelebration";
import { BingoMessage } from "@/components/BingoMessage";

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [expectedEvents, setExpectedEvents] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newBingoAchieved, setNewBingoAchieved] = useState(false);

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

  // Trigger confetti and message when bingo is achieved
  useEffect(() => {
    if (newBingoAchieved) {
      setShowConfetti(true);
      setShowMessage(true);
      
      // Reset confetti after animation completes
      const confettiTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      
      // Hide message after a longer duration
      const messageTimer = setTimeout(() => {
        setShowMessage(false);
      }, 8000);
      
      // Reset the new bingo flag
      const resetTimer = setTimeout(() => {
        setNewBingoAchieved(false);
      }, 8000);
      
      return () => {
        clearTimeout(confettiTimer);
        clearTimeout(messageTimer);
        clearTimeout(resetTimer);
      };
    }
  }, [newBingoAchieved]);

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
    
    return adjustedMisfortunes;
  };
  
  const calculateAdjustedProbability = (baseProbability: number, count: number): number => {
    // Increase probability based on number of family members, but with diminishing returns
    return Math.min(baseProbability * (1 + 0.5 * Math.log(count + 1)), 99);
  };

  // Simple string hash function to generate a numeric seed from any string
  const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const generateBingoCard = () => {
    // Get seed from input - use the full input string for hashing
    const seedInput = configData.seedInput || Math.random().toString();
    const seedNumber = hashString(seedInput);
    
    // Create seeded random generator
    const random = new SeededRandom(seedNumber);
    
    // Get all relevant misfortunes based on configuration
    const relevantMisfortunes = getAdjustedMisfortunes();
    
    // Calculate lifetime misfortune expectation
    const totalProbability = relevantMisfortunes.reduce((sum, item) => sum + item.probability, 0);
    const averageMisfortunes = totalProbability / 100; // Expected number in a lifetime
    setExpectedEvents(averageMisfortunes);
    
    // Shuffle all misfortunes using the seeded random
    const shuffledMisfortunes = random.shuffle([...relevantMisfortunes]);
    
    // Take the first 16 items (or all if less than 16)
    const selectedItems = shuffledMisfortunes.slice(0, 16);
    
    // If we don't have enough items, add generic ones to fill the board
    const bingoCard: Misfortune[] = [];
    for (let i = 0; i < 16; i++) {
      if (i < selectedItems.length) {
        bingoCard.push({...selectedItems[i], checked: false});
      } else {
        // Fallback in case we don't have enough items
        bingoCard.push({ 
          text: `You have experienced misfortune #${i + 1}`, 
          probability: 5, 
          checked: false 
        });
      }
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
      checkForBingo(newItems);
    }, 100);
  };

  const checkForBingo = (items = bingoItems) => {
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
    let foundBingo = false;
    for (const line of lines) {
      if (line.every(index => items[index]?.checked)) {
        foundBingo = true;
        break;
      }
    }
    
    // Only trigger animation if this is a new bingo
    if (foundBingo && !hasBingo) {
      setHasBingo(true);
      setNewBingoAchieved(true);
    } else if (!foundBingo && hasBingo) {
      setHasBingo(false);
    }
  };

  // Save the current state of checked items to cookies
  const saveBingoState = () => {
    // Create a cookie key based on the seed to ensure different boards have different saved states
    const cookieKey = `${BINGO_STATE_COOKIE_NAME}-${hashString(configData.seedInput)}`;
    
    // Save only the checked state of each item
    const checkedState = bingoItems.map(item => item.checked || false);
    
    Cookies.set(cookieKey, JSON.stringify(checkedState), { 
      expires: 365, // Store for 1 year
      sameSite: 'strict'
    });
  };

  // Load the checked state from cookies
  const loadBingoState = () => {
    const cookieKey = `${BINGO_STATE_COOKIE_NAME}-${hashString(configData.seedInput)}`;
    
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
            checkForBingo(updatedItems);
          }, 100);
        }
      } catch (error) {
        console.error("Error parsing saved bingo state:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full w-full justify-center">
      {/* Confetti celebration */}
      <ConfettiCelebration 
        active={showConfetti} 
        duration={5000}
        particleCount={300}
      />
      
      {/* Bingo message */}
      <BingoMessage show={showMessage} />
      
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex flex-col space-y-1 mb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Life Events Bingo</h3>
            </div>
            <div className="relative group">
              <Settings 
                className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                onClick={onOpenSettings}
              />
              <div className="absolute right-0 top-full mt-1 w-32 bg-popover text-popover-foreground text-xs p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                Settings and configuration
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Mark off events you&apos;ve experienced
          </p>
        </div>
        
        {/* Bingo board */}
        <div className="w-full aspect-square">
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
      </div>
    </div>
  );
} 