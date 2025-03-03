export interface Misfortune {
  text: string;
  probability: number;
  checked?: boolean;
}

export const baseMisfortunes: Misfortune[] = [
  // Health-related
  { text: "You've had a spouse die unexpectedly", probability: 3 },
  { text: "You've had a child die unexpectedly", probability: 1.5 },
  { text: "You've had a parent die unexpectedly", probability: 8 },
  { text: "You've had a sibling die unexpectedly", probability: 4 },
  
  { text: "You've received a terminal diagnosis", probability: 20 },
  { text: "You've had a spouse that has received a terminal diagnosis", probability: 22 },
  { text: "You've had a child that has received a terminal diagnosis", probability: 5 },
  { text: "You've had a parent that has received a terminal diagnosis", probability: 40 },
  { text: "You've had a sibling that has received a terminal diagnosis", probability: 20 },
  
  { text: "You've become severely disabled", probability: 10 },
  { text: "You've had a spouse that has become severely disabled", probability: 10 },
  { text: "You've had a child that has become severely disabled", probability: 7 },
  { text: "You've had a parent that has become severely disabled", probability: 20 },
  { text: "You've had a sibling that has become severely disabled", probability: 9 },
  
  // Addiction-related
  { text: "You've developed a gambling addiction", probability: 2 },
  { text: "You've developed an alcohol addiction", probability: 10 },
  { text: "You've developed a drug addiction", probability: 3 },
  
  { text: "You've had a spouse that has developed a gambling addiction", probability: 2 },
  { text: "You've had a spouse that has developed an alcohol addiction", probability: 10 },
  { text: "You've had a spouse that has developed a drug addiction", probability: 3 },
  
  { text: "You've had a child that has developed a gambling addiction", probability: 1 },
  { text: "You've had a child that has developed an alcohol addiction", probability: 10 },
  { text: "You've had a child that has developed a drug addiction", probability: 6 },
  
  { text: "You've had a parent that has developed a gambling addiction", probability: 2 },
  { text: "You've had a parent that has developed an alcohol addiction", probability: 10 },
  { text: "You've had a parent that has developed a drug addiction", probability: 2 },
  
  { text: "You've had a sibling that has developed a gambling addiction", probability: 2 },
  { text: "You've had a sibling that has developed an alcohol addiction", probability: 10 },
  { text: "You've had a sibling that has developed a drug addiction", probability: 5 },
  
  // Mental health-related
  { text: "You've struggled with severe depression", probability: 15 },
  { text: "You've had a spouse that has struggled with severe depression", probability: 15 },
  { text: "You've had a child that has struggled with severe depression", probability: 15 },
  { text: "You've had a parent that has struggled with severe depression", probability: 15 },
  { text: "You've had a sibling that has struggled with severe depression", probability: 15 },
  
  // Relationship-related
  { text: "You've gone through a divorce", probability: 40 },
  { text: "You've had parents divorcing", probability: 35 },
  
  // Financial/work-related
  { text: "You've gone bankrupt", probability: 15 },
  { text: "You've had a spouse that has gone bankrupt", probability: 15 },
  { text: "You've had a child that has gone bankrupt", probability: 10 },
  { text: "You've had a parent that has gone bankrupt", probability: 10 },
  { text: "You've had a sibling that has gone bankrupt", probability: 10 },
  
  { text: "You've lost your job unexpectedly", probability: 30 },
  { text: "You've had a spouse lose their job unexpectedly", probability: 30 },
  { text: "You've had a child lose their job unexpectedly", probability: 25 },
  { text: "You've had a parent lose their job unexpectedly", probability: 20 },
  { text: "You've had a sibling lose their job unexpectedly", probability: 25 },
  
  // Crime/safety-related
  { text: "You've been a victim of a serious crime", probability: 20 },
  { text: "You've had a spouse that has been a victim of a serious crime", probability: 20 },
  { text: "You've had a child that has been a victim of a serious crime", probability: 15 },
  { text: "You've had a parent that has been a victim of a serious crime", probability: 15 },
  { text: "You've had a sibling that has been a victim of a serious crime", probability: 18 },
  
  { text: "You've been a victim of sexual assault", probability: 10 },
  { text: "You've had a spouse that has been a victim of sexual assault", probability: 10 },
  { text: "You've had a child that has been a victim of sexual assault", probability: 8 },
  { text: "You've had a parent that has been a victim of sexual assault", probability: 8 },
  { text: "You've had a sibling that has been a victim of sexual assault", probability: 9 },
  
  { text: "You've had a spouse go missing", probability: 0.5 },
  { text: "You've had a child go missing", probability: 0.8 },
  { text: "You've had a parent go missing", probability: 0.3 },
  { text: "You've had a sibling go missing", probability: 0.5 },
  
  { text: "You've experienced stalking", probability: 8 },
  { text: "You've had a spouse that has experienced stalking", probability: 8 },
  { text: "You've had a child that has experienced stalking", probability: 6 },
  { text: "You've had a parent that has experienced stalking", probability: 4 },
  { text: "You've had a sibling that has experienced stalking", probability: 6 },
  
  { text: "You've been a victim of serious identity theft", probability: 10 },
  { text: "You've had a spouse that has been a victim of serious identity theft", probability: 10 },
  { text: "You've had a child that has been a victim of serious identity theft", probability: 8 },
  { text: "You've had a parent that has been a victim of serious identity theft", probability: 12 },
  { text: "You've had a sibling that has been a victim of serious identity theft", probability: 9 },
  
  // War/Conflict Related
  { text: "You've been severely affected by war", probability: 3 },
  { text: "You've had a spouse severely affected by war", probability: 3 },
  { text: "You've had a child severely affected by war", probability: 2.5 },
  { text: "You've had a parent severely affected by war", probability: 4 },
  { text: "You've had a sibling severely affected by war", probability: 3 },
  
  // Displacement/Housing
  { text: "You've been forced to move out of your home", probability: 6 },
  { text: "You've had a spouse forced to move out of their home", probability: 6 },
  { text: "You've had a child forced to move out of their home", probability: 5 },
  { text: "You've had a parent forced to move out of their home", probability: 7 },
  { text: "You've had a sibling forced to move out of their home", probability: 6 },
  
  // Witnessing Trauma
  { text: "You've witnessed a traumatic event", probability: 15 },
  { text: "You've had a spouse witness a traumatic event", probability: 15 },
  { text: "You've had a child witness a traumatic event", probability: 12 },
  { text: "You've had a parent witness a traumatic event", probability: 12 },
  { text: "You've had a sibling witness a traumatic event", probability: 14 },
  
  // Chronic Illness
  { text: "You've been diagnosed with a serious chronic illness", probability: 15 },
  { text: "You've had a spouse diagnosed with a serious chronic illness", probability: 15 },
  { text: "You've had a child diagnosed with a serious chronic illness", probability: 7 },
  { text: "You've had a parent diagnosed with a serious chronic illness", probability: 25 },
  { text: "You've had a sibling diagnosed with a serious chronic illness", probability: 12 },
  
  // Disaster-related
  { text: "You've been severely affected by a natural disaster", probability: 3 },
  { text: "You've had a spouse being serverly affected by a natural disaster", probability: 3 },
  { text: "You've had a child being serverly affected by a natural disaster", probability: 3 },
  { text: "You've had a parent being serverly affected by a natural disaster", probability: 3 },
  { text: "You've had a sibling being serverly affected by a natural disaster", probability: 3 },
  
  // Specific cases
  { text: "You've had a spouse cheat on you", probability: 15 },
  { text: "You've lost custody of your child", probability: 5 },
  { text: "You've experienced a miscarriage", probability: 15 },
  
  { text: "You've had a pet die suddenly", probability: 40 }
]; 