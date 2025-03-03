"use client"

export function ExistenceBingoList() {
  // Define templates as arrays of arrays
  // Each inner array contains options for that position in the sentence
  const templates = [
    // Health-related
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['die unexpectedly']],
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['get a terminal diagnosis']],
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['become severely disabled']],
    
    // Addiction-related
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['develop a'], ['gambling addiction', 'alcohol addiction', 'drug addiction']],
    
    // Mental health-related
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['develop'], ['severe mental health problems', 'a challenging chronic illness']],
    
    // Relationship-related
    [['You', 'Your parents'], ['get divorced']],
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['experience'], ['severe betrayal/infidelity']],
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['is severely bullied']],
    
    // Financial/work-related
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['experience financial ruin']],
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['suddenly lose their job']],
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['become homeless']],
    
    // Crime/safety-related
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['become'], ['sexually assaulted', 'victims of violent crime', 'imprisoned']],
    [['Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['go missing']],
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['experience'], ['stalking or harassment']],
    
    // Disaster-related
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['experience'], ['a natural disaster', 'a serious accident']],
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['experiences war']],
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['face serious legal troubles']],
    [['You', 'Your spouse', 'Your child', 'Your parent', 'Your sibling'], ['are forced to leave your home']],
    
    // Other specific cases
    [['Your child', 'Your spouse'], ['experience miscarriage']],
    [['Your pet'], ['dies']],
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