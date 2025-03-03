"use client"

// Define the item structure with separate prefix and suffix arrays
type BingoItem = {
  prefixes: string[];
  connector: string;
  suffixes: string[];
};

export function ExistenceBingoList() {
  // Define all possible items with arrays of prefixes and suffixes
  const bingoItems: BingoItem[] = [
    {
      prefixes: ['You', 'Your spouse', 'Your close family member'],
      connector: '',
      suffixes: ['die unexpectedly', 'get a terminal diagnosis', 'become severely disabled']
    },
    {
      prefixes: ['You', 'Your spouse', 'Your close family member'],
      connector: 'develop',
      suffixes: ['gambling addiction', 'alcohol addiction', 'drug addiction', 'severe mental health problems', 'chronic pain', 'dementia/cognitive decline']
    },
    {
      prefixes: ['You', 'Your parents'],
      connector: '',
      suffixes: ['get divorced']
    },
    {
      prefixes: ['You', 'Your spouse', 'Your close family member'],
      connector: '',
      suffixes: [
        'experience financial ruin', 
        'suddenly lose their job', 
        'become homeless',
        'become sexually assaulted',
        'become victims of violent crime',
        'become imprisoned',
        'experience severe betrayal/infidelity',
        'is severely bullied',
        'experiences war',
        'experience a natural disaster',
        'face serious legal troubles',
        'experience a serious accident',
        'are forced to leave your home'
      ]
    },
    {
      prefixes: ['Your close family member'],
      connector: '',
      suffixes: ['experience miscarriage']
    },
    {
      prefixes: ['Your pet'],
      connector: '',
      suffixes: ['dies']
    },
  ];

  // Function to expand all combinations into individual items
  const expandAllCombinations = (items: BingoItem[]): string[] => {
    const expandedItems: string[] = [];
    
    items.forEach(item => {
      const { prefixes, connector, suffixes } = item;
      
      // For each prefix and each suffix, create a separate item
      prefixes.forEach(prefix => {
        suffixes.forEach(suffix => {
          // Combine with connector (add spaces appropriately)
          const connectorWithSpaces = connector 
            ? ` ${connector} ` 
            : ' ';
          
          expandedItems.push(`${prefix}${connectorWithSpaces}${suffix}`);
        });
      });
    });
    
    return expandedItems;
  };

  // Get all expanded combinations
  const allCombinations = expandAllCombinations(bingoItems);

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-lg bg-card">
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Existence Bingo</h2>
      <p className="mb-6 text-center text-sm text-muted-foreground">All possible combinations ({allCombinations.length} items)</p>
      <ol className="list-decimal pl-6 space-y-1 text-foreground">
        {allCombinations.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );
} 