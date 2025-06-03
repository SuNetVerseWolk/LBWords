declare const SECTION_PROMPTS: {
  pronunciation: string;
  frequency: string;
  wordForms: string;
  mainMeanings: string;
  possibleMeanings: string;
  synonymsAntonyms: string;
  collocations: string;
  idioms: string;
  commonMistakes: string;
  grammarRule: string;
  grammarExamples: string;
  relatedRules: string;
  grammarFrequency: string;
  pronunciationTips: string;
  taboos: string;
  examples: string;
  additionalNotes: string;
};

type AnalysisSection = keyof typeof SECTION_PROMPTS;