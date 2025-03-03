"use client"

export function ExistenceBingoList() {
  // Define templates as arrays of arrays with proper subject-verb agreement
  // Each inner array contains options for that position in the sentence
  const templates = [
    // Health-related
    [
      ['You'], ['die unexpectedly']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['dies unexpectedly']
    ],
    [
      ['You'], ['get a terminal diagnosis']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['gets a terminal diagnosis']
    ],
    [
      ['You'], ['become severely disabled']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['becomes severely disabled']
    ],
    
    // Addiction-related
    [
      ['You'], ['develop a'], ['gambling addiction', 'alcohol addiction', 'drug addiction']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['develops a'], ['gambling addiction', 'alcohol addiction', 'drug addiction']
    ],
    
    // Mental health-related
    [
      ['You'], ['develop'], ['severe mental health problems', 'a challenging chronic illness']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['develops'], ['severe mental health problems', 'a challenging chronic illness']
    ],
    
    // Relationship-related
    [
      ['You'], ['get divorced']
    ],
    [
      ['Your parents'], ['get divorced']
    ],
    [
      ['You'], ['experience'], ['severe betrayal/infidelity']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['experiences'], ['severe betrayal/infidelity']
    ],
    [
      ['You'], ['are severely bullied']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['is severely bullied']
    ],
    
    // Financial/work-related
    [
      ['You'], ['experience financial ruin']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['experiences financial ruin']
    ],
    [
      ['You'], ['suddenly lose your job']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['suddenly loses their job']
    ],
    [
      ['You'], ['become homeless']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['becomes homeless']
    ],
    
    // Crime/safety-related
    [
      ['You'], ['are'], ['sexually assaulted', 'a victim of violent crime', 'imprisoned']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['is'], ['sexually assaulted', 'a victim of violent crime', 'imprisoned']
    ],
    [
      ['You'], ['go missing']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['goes missing']
    ],
    [
      ['You'], ['experience'], ['stalking or harassment']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['experiences'], ['stalking or harassment']
    ],
    
    // Disaster-related
    [
      ['You'], ['experience'], ['a natural disaster', 'a serious accident']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['experiences'], ['a natural disaster', 'a serious accident']
    ],
    [
      ['You'], ['experience war']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['experiences war']
    ],
    [
      ['You'], ['face serious legal troubles']
    ],
    [
      ['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['faces serious legal troubles']
    ],
    [
      ['You'], ['are forced to leave your home']
    ],
    [
      ['Your child', 'Your parent', 'Your sibling'], ['is forced to leave their home']
    ],
    
    // Other specific cases
    [
      ['You'], ['experience a miscarriage']
    ],
    [
      ['Your child'], ['experiences a miscarriage']
    ],
    [
      ['Your pet'], ['dies']
    ],
  ];

  // Generate all possible permutations from a template
  const generatePermutations = (template: any[]): string[] => {
    // Start with an array containing an empty string
    let results: string[] = [''];
    
    // For each part of the template
    for (const part of template) {
      // Create a new set of results by appending each option to each existing result
      const newResults: string[] = [];
      
      for (const existingResult of results) {
        for (const option of part) {
          // Add a space if this isn't the first part
          const prefix = existingResult ? existingResult + ' ' : '';
          newResults.push(prefix + option);
        }
      }
      
      // Replace the old results with the new ones
      results = newResults;
    }
    
    return results;
  };

  // Generate all permutations from all templates
  const allPermutations = templates.flatMap(template => generatePermutations(template));

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-lg bg-card">
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Existence Bingo</h2>
      <p className="mb-6 text-center text-sm text-muted-foreground">All possible misfortunes ({allPermutations.length} items)</p>
      <ol className="list-decimal pl-6 space-y-1 text-foreground">
        {allPermutations.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );
} 