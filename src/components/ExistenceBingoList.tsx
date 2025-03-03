"use client"

import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Misfortune {
  text: string;
  probability: number;
}

export function ExistenceBingoList() {
  // Configuration state for family members
  const [hasSpouse, setHasSpouse] = useState(true);
  const [childCount, setChildCount] = useState(1);
  const [siblingCount, setSiblingCount] = useState(1);
  const [hasPet, setHasPet] = useState(true);
  
  // State for the bingo card view
  const [showBingoCard, setShowBingoCard] = useState(false);
  const [bingoItems, setBingoItems] = useState<{text: string, probability: number, checked?: boolean}[]>([]);
  
  // New state for the life simulation
  const [simulationResults, setSimulationResults] = useState<string[]>([]);
  const [showSimulation, setShowSimulation] = useState(false);
  const [expectedEvents, setExpectedEvents] = useState(0);
  
  // Base misfortunes with probabilities - simplified format
  const baseMisfortunes: Misfortune[] = [
    // Health-related
    { text: "You've had a spouse die unexpectedly", probability: 3 }, // 3%
    { text: "You've had a child die unexpectedly", probability: 1.5 }, // 1.5% - sadly, some children die before parents
    { text: "You've had a parent die unexpectedly", probability: 8 }, // 8% - more common as parents age
    { text: "You've had a sibling die unexpectedly", probability: 4 }, // 4%
    
    { text: "You've received a terminal diagnosis", probability: 20 }, // 20% - serious illness in lifetime
    { text: "You've had a spouse that has received a terminal diagnosis", probability: 22 }, // 22%
    { text: "You've had a child that has received a terminal diagnosis", probability: 5 }, // 5% - less common in children
    { text: "You've had a parent that has received a terminal diagnosis", probability: 40 }, // 40% - higher for aging parents
    { text: "You've had a sibling that has received a terminal diagnosis", probability: 20 }, // 20%
    
    { text: "You've become severely disabled", probability: 10 }, // 10%
    { text: "You've had a spouse that has become severely disabled", probability: 10 }, // 10%
    { text: "You've had a child that has become severely disabled", probability: 7 }, // 7%
    { text: "You've had a parent that has become severely disabled", probability: 20 }, // 20% - increases with age
    { text: "You've had a sibling that has become severely disabled", probability: 9 }, // 9%
    
    // Addiction-related
    { text: "You've developed a gambling addiction", probability: 2 }, // 2%
    { text: "You've developed an alcohol addiction", probability: 10 }, // 10%
    { text: "You've developed a drug addiction", probability: 3 }, // 3%
    
    { text: "You've had a spouse that has developed a gambling addiction", probability: 2 }, // 2%
    { text: "You've had a spouse that has developed an alcohol addiction", probability: 10 }, // 10%
    { text: "You've had a spouse that has developed a drug addiction", probability: 3 }, // 3%
    
    { text: "You've had a child that has developed a gambling addiction", probability: 1 }, // 1%
    { text: "You've had a child that has developed an alcohol addiction", probability: 10 }, // 10%
    { text: "You've had a child that has developed a drug addiction", probability: 6 }, // 6% - more common in youth
    
    { text: "You've had a parent that has developed a gambling addiction", probability: 2 }, // 2%
    { text: "You've had a parent that has developed an alcohol addiction", probability: 10 }, // 10%
    { text: "You've had a parent that has developed a drug addiction", probability: 2 }, // 2%
    
    { text: "You've had a sibling that has developed a gambling addiction", probability: 2 }, // 2%
    { text: "You've had a sibling that has developed an alcohol addiction", probability: 10 }, // 10%
    { text: "You've had a sibling that has developed a drug addiction", probability: 5 }, // 5%
    
    // Mental health-related
    { text: "You've struggled with severe depression", probability: 15 }, // 15%
    { text: "You've had a spouse that has struggled with severe depression", probability: 15 }, // 15%
    { text: "You've had a child that has struggled with severe depression", probability: 15 }, // 15%
    { text: "You've had a parent that has struggled with severe depression", probability: 15 }, // 15%
    { text: "You've had a sibling that has struggled with severe depression", probability: 15 }, // 15%
    
    // Relationship-related
    { text: "You've gone through a divorce", probability: 40 }, // 40%
    { text: "You've had parents divorcing", probability: 35 }, // 35%
    
    // Financial/work-related
    { text: "You've experienced gone bankrupt", probability: 15 }, // 15%
    { text: "You've had a spouse that has gone bankrupt", probability: 15 }, // 15%
    { text: "You've had a child that has gone bankrupt", probability: 10 }, // 10%
    { text: "You've had a parent that has gone bankrupt", probability: 10 }, // 10%
    { text: "You've had a sibling that has gone bankrupt", probability: 10 }, // 10%
    
    { text: "You've lost your job unexpectedly", probability: 30 }, // 30%
    { text: "You've had a spouse lose their job unexpectedly", probability: 30 }, // 30%
    { text: "You've had a child lose their job unexpectedly", probability: 25 }, // 25%
    { text: "You've had a parent lose their job unexpectedly", probability: 20 }, // 20%
    { text: "You've had a sibling lose their job unexpectedly", probability: 25 }, // 25%
    
    // Crime/safety-related
    { text: "You've been a victim of a serious crime", probability: 20 }, // 20%
    { text: "You've had a spouse that has been a victim of a serious crime", probability: 20 }, // 20%
    { text: "You've had a child that has been a victim of a serious crime", probability: 15 }, // 15%
    { text: "You've had a parent that has been a victim of a serious crime", probability: 15 }, // 15%
    { text: "You've had a sibling that has been a victim of a serious crime", probability: 18 }, // 18%
    
    { text: "You've been a victim of sexual assault", probability: 10 }, // 10%
    { text: "You've had a spouse that has been a victim of sexual assault", probability: 10 }, // 10%
    { text: "You've had a child that has been a victim of sexual assault", probability: 8 }, // 8%
    { text: "You've had a parent that has been a victim of sexual assault", probability: 8 }, // 8%
    { text: "You've had a sibling that has been a victim of sexual assault", probability: 9 }, // 9%
    
    { text: "You've had a spouse go missing", probability: 0.5 }, // 0.5%
    { text: "You've had a child go missing", probability: 0.8 }, // 0.8%
    { text: "You've had a parent go missing", probability: 0.3 }, // 0.3%
    { text: "You've had a sibling go missing", probability: 0.5 }, // 0.5%
    
    { text: "You've experienced stalking", probability: 8 }, // 8%
    { text: "You've had a spouse that has experienced stalking", probability: 8 }, // 8%
    { text: "You've had a child that has experienced stalking", probability: 6 }, // 6%
    { text: "You've had a parent that has experienced stalking", probability: 4 }, // 4%
    { text: "You've had a sibling that has experienced stalking", probability: 6 }, // 6%
    
    { text: "You've been a victim of serious identity theft", probability: 10 }, // 10%
    { text: "You've had a spouse that has been a victim of serious identity theft", probability: 10 }, // 10%
    { text: "You've had a child that has been a victim of serious identity theft", probability: 8 }, // 8%
    { text: "You've had a parent that has been a victim of serious identity theft", probability: 12 }, // 12%
    { text: "You've had a sibling that has been a victim of serious identity theft", probability: 9 }, // 9%
    
    // War/Conflict Related
    { text: "You've been severely affected by war or armed conflict", probability: 3 }, // 3%
    { text: "You've had a spouse severely affected by war or armed conflict", probability: 3 }, // 3%
    { text: "You've had a child severely affected by war or armed conflict", probability: 2.5 }, // 2.5%
    { text: "You've had a parent severely affected by war or armed conflict", probability: 4 }, // 4%
    { text: "You've had a sibling severely affected by war or armed conflict", probability: 3 }, // 3%
    
    // Displacement/Housing
    { text: "You've been forced to move out of your home", probability: 6 }, // 6%
    { text: "You've had a spouse forced to move out of their home", probability: 6 }, // 6%
    { text: "You've had a child forced to move out of their home", probability: 5 }, // 5%
    { text: "You've had a parent forced to move out of their home", probability: 7 }, // 7%
    { text: "You've had a sibling forced to move out of their home", probability: 6 }, // 6%
    
    // Witnessing Trauma
    { text: "You've witnessed a traumatic event", probability: 15 }, // 15%
    { text: "You've had a spouse witness a traumatic event", probability: 15 }, // 15%
    { text: "You've had a child witness a traumatic event", probability: 12 }, // 12%
    { text: "You've had a parent witness a traumatic event", probability: 12 }, // 12%
    { text: "You've had a sibling witness a traumatic event", probability: 14 }, // 14%
    
    // Chronic Illness
    { text: "You've been diagnosed with a serious chronic illness", probability: 15 }, // 15%
    { text: "You've had a spouse diagnosed with a serious chronic illness", probability: 15 }, // 15%
    { text: "You've had a child diagnosed with a serious chronic illness", probability: 7 }, // 7%
    { text: "You've had a parent diagnosed with a serious chronic illness", probability: 25 }, // 25%
    { text: "You've had a sibling diagnosed with a serious chronic illness", probability: 12 }, // 12%
    
    // Disaster-related
    { text: "You've been severely affected by a natural disaster", probability: 3 }, // 3%
    { text: "You've had a spouse being serverly affected by a natural disaster", probability: 3 }, // 3%
    { text: "You've had a child being serverly affected by a natural disaster", probability: 3 }, // 3%
    { text: "You've had a parent being serverly affected by a natural disaster", probability: 3 }, // 3%
    { text: "You've had a sibling being serverly affected by a natural disaster", probability: 3 }, // 3%
    
    // Specific cases
    { text: "You've had a spouse cheat on you", probability: 15 }, // 15%
    { text: "You've lost custody of your child", probability: 5 }, // 5%
    { text: "You've experienced a miscarriage", probability: 15 }, // 15%
    
    { text: "You've had a pet die suddenly", probability: 40 } // 40% - sadly common for pet owners
  ];
  
  // Calculate adjusted probability for multiple family members
  const calculateAdjustedProbability = (baseProbability: number, count: number): number => {
    return (1 - Math.pow(1 - baseProbability / 100, count)) * 100;
  };
  
  // Get all misfortunes adjusted for family composition
  const getAdjustedMisfortunes = (): {text: string, probability: number}[] => {
    const result: {text: string, probability: number}[] = [];
    
    baseMisfortunes.forEach(misfortune => {
      const text = misfortune.text;
      
      // Filter based on family composition
      if (text.includes("spouse") && !hasSpouse) return;
      if (text.includes("child") && childCount === 0) return;
      if (text.includes("sibling") && siblingCount === 0) return;
      if (text.includes("pet") && !hasPet) return;
      
      // Calculate adjusted probability
      let adjustedProbability = misfortune.probability;
      
      if (text.includes("spouse") && hasSpouse) {
        adjustedProbability = misfortune.probability;
      } else if (text.includes("child") && childCount > 0) {
        adjustedProbability = calculateAdjustedProbability(misfortune.probability, childCount);
      } else if (text.includes("sibling") && siblingCount > 0) {
        adjustedProbability = calculateAdjustedProbability(misfortune.probability, siblingCount);
      }

      result.push({
        text,
        probability: adjustedProbability
      });
    });
    
    // Sort by probability (descending)
    return result.sort((a, b) => b.probability - a.probability);
  };
  
  // Generate a balanced 5x5 bingo card (25 items)
  const generateBingoCard = () => {
    const allMisfortunes = getAdjustedMisfortunes();
    const bingoCard: {text: string, probability: number, checked?: boolean}[] = [];
    
    // Calculate lifetime misfortune expectation
    const totalProbability = allMisfortunes.reduce((sum, item) => sum + item.probability, 0);
    const averageMisfortunes = totalProbability / 100; // Expected number in a lifetime
    
    console.log(`Expected misfortunes in lifetime: ${averageMisfortunes.toFixed(1)}`);
    
    // Create probability buckets for a balanced card
    const highProb = allMisfortunes.filter(m => m.probability >= 30);
    const mediumProb = allMisfortunes.filter(m => m.probability >= 10 && m.probability < 30);
    const lowProb = allMisfortunes.filter(m => m.probability < 10);
    
    // Smart selection for a more realistic bingo chance
    // We'll strategically place high probability events to increase chance of getting a bingo
    const shuffleAndSlice = (arr: any[], count: number) => {
      return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
    };
    
    // Select misfortunes from each probability bucket
    const highItems = shuffleAndSlice(highProb, 9);
    const mediumItems = shuffleAndSlice(mediumProb, 9); 
    const lowItems = shuffleAndSlice(lowProb, 7);
    
    // Strategic placement for bingo chances
    const allItems = [...highItems, ...mediumItems, ...lowItems];
    allItems.sort(() => Math.random() - 0.5); // Shuffle all items
    
    // Create a 5x5 grid with all spaces filled with misfortunes
    for (let i = 0; i < 25; i++) {
      if (i < allItems.length) {
        bingoCard.push({...allItems[i], checked: false});
      } else {
        // Fallback in case we don't have enough items
        bingoCard.push({ text: "You have experienced an unexpected misfortune", probability: 5, checked: false });
      }
    }
    
    // Make sure at least one line has a good chance of bingo
    // We'll ensure one random row, column or diagonal has higher probability items
    const ensureWinnableLine = () => {
      // Possible winning lines (rows, columns, diagonals)
      const lines = [
        [0, 1, 2, 3, 4],       // row 1
        [5, 6, 7, 8, 9],       // row 2
        [10, 11, 12, 13, 14],  // row 3
        [15, 16, 17, 18, 19],  // row 4
        [20, 21, 22, 23, 24],  // row 5
        [0, 5, 10, 15, 20],    // col 1
        [1, 6, 11, 16, 21],    // col 2
        [2, 7, 12, 17, 22],    // col 3
        [3, 8, 13, 18, 23],    // col 4
        [4, 9, 14, 19, 24],    // col 5
        [0, 6, 12, 18, 24],    // diagonal 1
        [4, 8, 12, 16, 20]     // diagonal 2
      ];
      
      // Choose a random line
      const chosenLineIndex = Math.floor(Math.random() * lines.length);
      const chosenLine = lines[chosenLineIndex];
      
      // For each position in the chosen line
      for (const pos of chosenLine) {
        // Replace with high probability items if not already high
        if (bingoCard[pos].probability < 30 && highItems.length > 0) {
          // Find unused high probability item
          for (const item of highItems) {
            if (!bingoCard.some(cardItem => cardItem.text === item.text)) {
              bingoCard[pos] = {...item, checked: false};
              break;
            }
          }
        }
      }
    };
    
    ensureWinnableLine();
    setBingoItems(bingoCard);
    setShowBingoCard(true);
  };
  
  // Toggle checked state for a bingo item
  const toggleChecked = (index: number) => {
    const newBingoItems = [...bingoItems];
    newBingoItems[index].checked = !newBingoItems[index].checked;
    setBingoItems(newBingoItems);
  };
  
  // Check if player has bingo
  const checkForBingo = (): boolean => {
    if (bingoItems.length === 0) return false;
    
    // Rows
    for (let i = 0; i < 5; i++) {
      if (bingoItems.slice(i*5, i*5+5).every(item => item.checked)) {
        return true;
      }
    }
    
    // Columns
    for (let i = 0; i < 5; i++) {
      if ([0,1,2,3,4].every(j => bingoItems[i + j*5].checked)) {
        return true;
      }
    }
    
    // Diagonals
    if ([0,6,12,18,24].every(i => bingoItems[i].checked)) return true;
    if ([4,8,12,16,20].every(i => bingoItems[i].checked)) return true;
    
    return false;
  };
  
  const hasBingo = checkForBingo();
  
  // Generate a new card on family composition change
  useEffect(() => {
    if (showBingoCard) {
      generateBingoCard();
    }
  }, [hasSpouse, childCount, siblingCount, hasPet, showBingoCard]);
  
  // New function to simulate life events
  const simulateLifeEvents = () => {
    const adjustedMisfortunes = getAdjustedMisfortunes();
    const simulatedEvents: string[] = [];
    
    // Calculate expected number of events
    const totalProbability = adjustedMisfortunes.reduce((sum, item) => sum + item.probability, 0);
    setExpectedEvents(totalProbability / 100);
    
    // Roll the dice for each possible event
    adjustedMisfortunes.forEach(event => {
      const roll = Math.random() * 100;
      if (roll < event.probability) {
        simulatedEvents.push(event.text);
      }
    });
    
    // Sort events alphabetically for better readability
    simulatedEvents.sort();
    
    setSimulationResults(simulatedEvents);
    setShowSimulation(true);
    setShowBingoCard(false);
  };
  
  const formattedMisfortunes = getAdjustedMisfortunes();
  
  return (
    <div className="w-full max-w-3xl mx-auto p-8 rounded-lg bg-card">
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Life Events Simulator</h2>
      
      <div className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Family Configuration</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="spouse-toggle" className="cursor-pointer">You have or plan to have a spouse/partner</Label>
            <Switch 
              id="spouse-toggle" 
              checked={hasSpouse} 
              onCheckedChange={setHasSpouse} 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="child-slider">Number of children (current or planned): {childCount}</Label>
            </div>
            <Slider 
              id="child-slider"
              min={0} 
              max={5} 
              step={1} 
              value={[childCount]} 
              onValueChange={(value: number[]) => setChildCount(value[0])} 
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="sibling-slider">Number of siblings (including step-siblings): {siblingCount}</Label>
            </div>
            <Slider 
              id="sibling-slider"
              min={0} 
              max={5} 
              step={1} 
              value={[siblingCount]} 
              onValueChange={(value: number[]) => setSiblingCount(value[0])} 
              className="py-4"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="pet-toggle" className="cursor-pointer">You have or plan to have pets</Label>
            <Switch 
              id="pet-toggle" 
              checked={hasPet} 
              onCheckedChange={setHasPet} 
            />
          </div>
          
          <div className="flex justify-center space-x-4 pt-4">
            <Button onClick={() => simulateLifeEvents()} variant="default">
              Simulate My Life Events
            </Button>
            <Button onClick={() => generateBingoCard()} variant="outline">
              Create Bingo Card Instead
            </Button>
          </div>
        </div>
      </div>
      
      {showSimulation && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2 text-center">Your Simulated Life Events</h3>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Based on probability calculations, you might experience about {expectedEvents.toFixed(1)} events in your lifetime.
            Your simulation resulted in {simulationResults.length} events:
          </p>
          
          {simulationResults.length === 0 ? (
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
              <h4 className="text-lg font-bold">Lucky You!</h4>
              <p>The simulation didn't result in any adverse life events. Consider yourself very fortunate!</p>
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <ol className="list-decimal pl-6 space-y-1">
                {simulationResults.map((event, index) => (
                  <li key={index} className="py-1">{event}</li>
                ))}
              </ol>
            </div>
          )}
          
          <div className="flex justify-center space-x-4 mt-6">
            <Button onClick={() => simulateLifeEvents()} variant="default">
              Roll Again
            </Button>
            <Button onClick={() => generateBingoCard()} variant="outline">
              Try Bingo Card Instead
            </Button>
          </div>
        </div>
      )}
      
      {showBingoCard ? (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2 text-center">Your Life Events Bingo Card</h3>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Mark off the events you've experienced in your life!
          </p>
          
          {hasBingo && (
            <div className="bg-yellow-100 dark:bg-yellow-900 p-4 mb-6 rounded-lg text-center animate-pulse">
              <h4 className="text-lg font-bold">BINGO!</h4>
              <p>You've completed a line of life's challenges!</p>
            </div>
          )}
          
          <div className="grid grid-cols-5 gap-2 mb-6">
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
          
          <div className="mt-6 flex justify-center">
            <Button onClick={() => setShowBingoCard(false)} variant="outline" className="mr-2">
              View Full List
            </Button>
            <Button onClick={() => generateBingoCard()}>
              Regenerate Card
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Personalized life events based on your family ({formattedMisfortunes.length} items), sorted by probability
          </p>
          
          <ol className="list-decimal pl-6 space-y-1 text-foreground">
            {formattedMisfortunes.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.text}</span>
                <span className="text-muted-foreground ml-4 text-sm tabular-nums">{item.probability.toFixed(1)}%</span>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
} 