"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionExample() {
  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg bg-card">
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Existence Bingo FAQ</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-muted">
          <AccordionTrigger className="text-foreground hover:text-primary">What is Existence Bingo?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Existence Bingo is a fun way to track and celebrate life experiences. 
            Mark off squares as you complete different experiences in life!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-muted">
          <AccordionTrigger className="text-foreground hover:text-primary">How do I play?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Start by creating a card with life experiences you want to achieve. 
            Each time you complete one, mark it off your card. Try to get 5 in a row or complete the entire card!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-muted">
          <AccordionTrigger className="text-foreground hover:text-primary">Can I customize my bingo card?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Absolutely! You can create custom bingo cards with your own life goals and experiences.
            Make it as easy or challenging as you'd like.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
} 