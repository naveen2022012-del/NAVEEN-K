export type AnalysisVerdict = 
  | 'LIKELY_REAL' 
  | 'LEANING_REAL' 
  | 'UNVERIFIED_OR_MIXED' 
  | 'LEANING_FAKE' 
  | 'LIKELY_FAKE' 
  | 'SATIRE_PARODY';

export interface ClaimAnalysis {
  id: string;
  claim: string;
  verdict: 'VERIFIED' | 'DISPUTED_OR_MISLEADING' | 'FABRICATED' | 'UNVERIFIED';
  explanation: string;
  confidence: number;
}

export interface ScoreBreakdown {
  overallCredibility: number; // 0 - 100
  factuality: number;         // 0 - 100 (high = verifiable facts)
  sensationalism: number;     // 0 - 100 (high = heavy emotional/clickbait tone)
  sourceAttribution: number;  // 0 - 100 (high = named verifiable sources)
  logicalConsistency: number; // 0 - 100 (high = sound reasoning, no fallacies)
  biasNeutrality: number;     // 0 - 100 (high = objective tone)
}

export interface FlagItem {
  type: 'red' | 'yellow' | 'green';
  category: string;
  quote?: string;
  note: string;
}

export interface NewsAnalysisResponse {
  verdict: AnalysisVerdict;
  credibilityScore: number;
  confidenceScore: number;
  verdictTitle: string;
  summary: string;
  headlineAnalysis: {
    sensationalismScore: number;
    isClickbait: boolean;
    notes: string;
  };
  scores: ScoreBreakdown;
  keyClaims: ClaimAnalysis[];
  flags: FlagItem[];
  detectedPatterns: string[];
  recommendedChecks: string[];
  crossCheckQueries: string[];
  sourceReputation?: {
    domain?: string;
    rating?: string;
    notes?: string;
  };
  timestamp: string;
}

export interface NewsAnalysisRequest {
  text: string;
  headline?: string;
  sourceUrl?: string;
  sourceName?: string;
}

export interface SampleNewsItem {
  id: string;
  category: 'Breaking Science' | 'Viral Social Forward' | 'Politics & Policy' | 'Satirical Outlet' | 'Health & Medicine';
  label: 'Real' | 'Fake' | 'Satire' | 'Misleading';
  headline: string;
  sourceName: string;
  content: string;
  description: string;
}

export interface MisinformationChallenge {
  id: string;
  number: number;
  title: string;
  category: string;
  problem: string;
  aiSolution: string;
  modelTech: string;
  impactLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
  tags: string[];
  sampleHeadline: string;
  sampleContent: string;
  sampleSourceName: string;
}

export interface StudentProfile {
  name: string;
  className: string;
  regNo: string;
}

export interface HistoryItem {
  id: string;
  headline: string;
  snippet: string;
  verdict: AnalysisVerdict;
  credibilityScore: number;
  timestamp: string;
  result: NewsAnalysisResponse;
}
