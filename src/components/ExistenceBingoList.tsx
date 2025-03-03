"use client"

interface Misfortune {
  subject: string;
  verb: string;
  object?: string;
  probability: number;
}

export function ExistenceBingoList() {
  // Define misfortunes with specific probabilities for each subject-event combination
  const misfortunes: Misfortune[] = [
    // Health-related
    { subject: "Your spouse", verb: "dies unexpectedly", probability: 3 }, // 3%
    { subject: "Your child", verb: "dies unexpectedly", probability: 1.5 }, // 1.5% - sadly, some children die before parents
    { subject: "Your parent", verb: "dies unexpectedly", probability: 8 }, // 8% - more common as parents age
    { subject: "Your sibling", verb: "dies unexpectedly", probability: 4 }, // 4%
    
    { subject: "You", verb: "get a terminal diagnosis", probability: 20 }, // 20% - serious illness in lifetime
    { subject: "Your spouse", verb: "gets a terminal diagnosis", probability: 22 }, // 22%
    { subject: "Your child", verb: "gets a terminal diagnosis", probability: 5 }, // 5% - less common in children
    { subject: "Your parent", verb: "gets a terminal diagnosis", probability: 40 }, // 40% - higher for aging parents
    { subject: "Your sibling", verb: "gets a terminal diagnosis", probability: 20 }, // 20%
    
    { subject: "You", verb: "become severely disabled", probability: 10 }, // 10%
    { subject: "Your spouse", verb: "becomes severely disabled", probability: 10 }, // 10%
    { subject: "Your child", verb: "becomes severely disabled", probability: 7 }, // 7%
    { subject: "Your parent", verb: "becomes severely disabled", probability: 20 }, // 20% - increases with age
    { subject: "Your sibling", verb: "becomes severely disabled", probability: 9 }, // 9%
    
    // Addiction-related
    { subject: "You", verb: "develop a gambling addiction", probability: 2 }, // 2%
    { subject: "You", verb: "develop an alcohol addiction", probability: 5 }, // 5%
    { subject: "You", verb: "develop a drug addiction", probability: 3 }, // 3%
    
    { subject: "Your spouse", verb: "develops a gambling addiction", probability: 2 }, // 2%
    { subject: "Your spouse", verb: "develops an alcohol addiction", probability: 5 }, // 5%
    { subject: "Your spouse", verb: "develops a drug addiction", probability: 3 }, // 3%
    
    { subject: "Your child", verb: "develops a gambling addiction", probability: 1.5 }, // 1.5%
    { subject: "Your child", verb: "develops an alcohol addiction", probability: 8 }, // 8% - commonly experimented in youth
    { subject: "Your child", verb: "develops a drug addiction", probability: 6 }, // 6%
    
    { subject: "Your parent", verb: "develops a gambling addiction", probability: 1.5 }, // 1.5%
    { subject: "Your parent", verb: "develops an alcohol addiction", probability: 7 }, // 7%
    { subject: "Your parent", verb: "develops a drug addiction", probability: 2 }, // 2%
    
    { subject: "Your sibling", verb: "develops a gambling addiction", probability: 2 }, // 2%
    { subject: "Your sibling", verb: "develops an alcohol addiction", probability: 8 }, // 8%
    { subject: "Your sibling", verb: "develops a drug addiction", probability: 5 }, // 5%
    
    // Mental health-related
    { subject: "You", verb: "develop severe depression", probability: 20 }, // 20%
    { subject: "You", verb: "develop severe anxiety", probability: 25 }, // 25%
    
    { subject: "Your spouse", verb: "develops severe depression", probability: 20 }, // 20%
    { subject: "Your spouse", verb: "develops severe anxiety", probability: 25 }, // 25%
    
    { subject: "Your child", verb: "develops severe depression", probability: 15 }, // 15%
    { subject: "Your child", verb: "develops severe anxiety", probability: 18 }, // 18%
    
    { subject: "Your parent", verb: "develops severe depression", probability: 15 }, // 15%
    { subject: "Your parent", verb: "develops severe anxiety", probability: 20 }, // 20%
    
    { subject: "Your sibling", verb: "develops severe depression", probability: 18 }, // 18%
    { subject: "Your sibling", verb: "develops severe anxiety", probability: 22 }, // 22%
    
    { subject: "You", verb: "commits suicide", probability: 0.5 }, // 0.5% - lifetime risk of completed suicide
    { subject: "Your spouse", verb: "commits suicide", probability: 0.5 }, // 0.5%
    { subject: "Your child", verb: "commits suicide", probability: 0.7 }, // 0.7% - slightly higher in youth
    { subject: "Your parent", verb: "commits suicide", probability: 0.4 }, // 0.4%
    { subject: "Your sibling", verb: "commits suicide", probability: 0.6 }, // 0.6%
    
    { subject: "You", verb: "are severely bullied", probability: 30 }, // 30% - common experience
    
    // Relationship-related
    { subject: "You", verb: "get divorced", probability: 40 }, // 40% - approx divorce rate
    { subject: "Your parents", verb: "get divorced", probability: 45 }, // 45% - slightly higher for parents
    
    { subject: "Your spouse", verb: "cheats on you", probability: 30 }, // 30% - same as above, different phrasing
    
    // Financial/work-related
    { subject: "You", verb: "go bankrupt", probability: 8 }, // 8%
    { subject: "Your spouse", verb: "goes bankrupt", probability: 8 }, // 8%
    { subject: "Your child", verb: "goes bankrupt", probability: 6 }, // 6% - slightly lower for younger people with less credit history
    { subject: "Your parent", verb: "goes bankrupt", probability: 7 }, // 7%
    { subject: "Your sibling", verb: "goes bankrupt", probability: 8 }, // 8%
    
    { subject: "You", verb: "become homeless", probability: 2 }, // 2%
    { subject: "Your spouse", verb: "becomes homeless", probability: 2 }, // 2%
    { subject: "Your child", verb: "becomes homeless", probability: 3 }, // 3% - higher risk in young adults
    { subject: "Your parent", verb: "becomes homeless", probability: 1.5 }, // 1.5%
    { subject: "Your sibling", verb: "becomes homeless", probability: 2.5 }, // 2.5%
    
    { subject: "You", verb: "suddenly lose your job", probability: 50 }, // 50% - most people experience job loss
    { subject: "Your spouse", verb: "suddenly loses their job", probability: 50 }, // 50%
    { subject: "Your parent", verb: "suddenly loses their job", probability: 60 }, // 60% - longer work history, more chance
    { subject: "Your sibling", verb: "suddenly loses their job", probability: 50 }, // 50%
    
    // Crime/safety-related
    { subject: "You", verb: "are sexually assaulted", probability: 20 }, // 20% - lifetime risk varies significantly by gender
    { subject: "Your spouse", verb: "is sexually assaulted", probability: 20 }, // 20%
    { subject: "Your child", verb: "is sexually assaulted", probability: 15 }, // 15% - tragically common
    { subject: "Your parent", verb: "is sexually assaulted", probability: 12 }, // 12% 
    { subject: "Your sibling", verb: "is sexually assaulted", probability: 18 }, // 18%
    
    { subject: "You", verb: "become a victim of identity theft", probability: 20 }, // 20% - increasingly common
    { subject: "Your spouse", verb: "becomes a victim of identity theft", probability: 20 }, // 20%
    { subject: "Your child", verb: "becomes a victim of identity theft", probability: 10 }, // 10% - children's identities are targeted
    { subject: "Your parent", verb: "becomes a victim of identity theft", probability: 25 }, // 25% - elderly often targeted
    { subject: "Your sibling", verb: "becomes a victim of identity theft", probability: 20 }, // 20%
    
    { subject: "You", verb: "become a victim of major fraud", probability: 15 }, // 15% - scams, financial fraud
    { subject: "Your spouse", verb: "becomes a victim of major fraud", probability: 15 }, // 15%
    { subject: "Your child", verb: "becomes a victim of major fraud", probability: 8 }, // 8% - less frequent for children
    { subject: "Your parent", verb: "becomes a victim of major fraud", probability: 25 }, // 25% - elderly are primary targets
    { subject: "Your sibling", verb: "becomes a victim of major fraud", probability: 15 }, // 15%
    
    { subject: "You", verb: "are a victim of violent crime", probability: 15 }, // 15%
    { subject: "Your spouse", verb: "is a victim of violent crime", probability: 15 }, // 15%
    { subject: "Your child", verb: "is a victim of violent crime", probability: 12 }, // 12%
    { subject: "Your parent", verb: "is a victim of violent crime", probability: 12 }, // 12%
    { subject: "Your sibling", verb: "is a victim of violent crime", probability: 15 }, // 15%
    
    { subject: "You", verb: "go to jail/prison", probability: 3 }, // 3%
    { subject: "Your spouse", verb: "goes to jail/prison", probability: 3 }, // 3%
    { subject: "Your child", verb: "goes to jail/prison", probability: 5 }, // 5% - higher risk in youth
    { subject: "Your parent", verb: "goes to jail/prison", probability: 2 }, // 2%
    { subject: "Your sibling", verb: "goes to jail/prison", probability: 4 }, // 4%
    
    { subject: "You", verb: "go missing", probability: 0.2 }, // 0.2% - very rare
    { subject: "Your spouse", verb: "goes missing", probability: 0.3 }, // 0.3%
    { subject: "Your child", verb: "goes missing", probability: 2 }, // 2% - higher for children
    { subject: "Your parent", verb: "goes missing", probability: 0.5 }, // 0.5%
    { subject: "Your sibling", verb: "goes missing", probability: 0.8 }, // 0.8%
    
    { subject: "You", verb: "experience stalking or harassment", probability: 12 }, // 12%
    { subject: "Your spouse", verb: "experiences stalking or harassment", probability: 12 }, // 12%
    { subject: "Your child", verb: "experiences stalking or harassment", probability: 15 }, // 15% - higher for younger people
    { subject: "Your parent", verb: "experiences stalking or harassment", probability: 8 }, // 8%
    { subject: "Your sibling", verb: "experiences stalking or harassment", probability: 12 }, // 12%
    
    // Disaster-related
    { subject: "You", verb: "are severly effected by a natural disaster", probability: 5 }, // 5%

    { subject: "You", verb: "are in a serious accident", probability: 25 }, // 25%
    { subject: "Your spouse", verb: "is in a serious accident", probability: 25 }, // 25%
    { subject: "Your child", verb: "is in a serious accident", probability: 20 }, // 20%
    { subject: "Your parent", verb: "is in a serious accident", probability: 25 }, // 25%
    { subject: "Your sibling", verb: "is in a serious accident", probability: 25 }, // 25%
    
    { subject: "You", verb: "face serious legal troubles", probability: 10 }, // 10%
    { subject: "Your spouse", verb: "faces serious legal troubles", probability: 10 }, // 10%
    { subject: "Your child", verb: "faces serious legal troubles", probability: 12 }, // 12% - higher risk in youth
    { subject: "Your parent", verb: "faces serious legal troubles", probability: 8 }, // 8%
    { subject: "Your sibling", verb: "faces serious legal troubles", probability: 10 }, // 10%
    
    { subject: "You", verb: "are forced to leave your home", probability: 7 }, // 7%
    { subject: "Your child", verb: "is forced to leave their home", probability: 10 }, // 10% - more common with youth
    { subject: "Your parent", verb: "is forced to leave their home", probability: 12 }, // 12% - more common with elderly
    { subject: "Your sibling", verb: "is forced to leave their home", probability: 9 }, // 9%
    
    // Other specific cases
    { subject: "You", verb: "experience a miscarriage", probability: 20 }, // 20% - common among women
    { subject: "Your child", verb: "experiences a miscarriage", probability: 20 }, // 20% - also common
    
    { subject: "Your pet", verb: "dies", probability: 80 }, // 80% - most pet owners experience pet death
    { subject: "Your pet", verb: "becomes seriously ill", probability: 60 }, // 60%
    { subject: "Your pet", verb: "becomes seriously injured", probability: 40 }, // 40%
  ];

  // Sort by probability (highest to lowest)
  misfortunes.sort((a, b) => b.probability - a.probability);

  // Generate the full text for each misfortune
  const formattedMisfortunes = misfortunes.map(m => {
    return {
      text: m.object 
        ? `${m.subject} ${m.verb} ${m.object}`
        : `${m.subject} ${m.verb}`,
      probability: m.probability
    };
  });

  return (
    <div className="w-full max-w-3xl mx-auto p-8 rounded-lg bg-card">
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Existence Bingo</h2>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        All possible misfortunes ({formattedMisfortunes.length} items), sorted by probability
      </p>
      <ol className="list-decimal pl-6 space-y-1 text-foreground">
        {formattedMisfortunes.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.text}</span>
            <span className="text-muted-foreground ml-4 text-sm tabular-nums">{item.probability}%</span>
          </li>
        ))}
      </ol>
    </div>
  );
} 