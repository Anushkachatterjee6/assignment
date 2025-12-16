export interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  personLocation: string;
  companyHQ: string;
  fundingStage: 'Bootstrapped' | 'Seed' | 'Series A' | 'Series B' | 'Series C+' | 'IPO';
  
  // Scientific signals
  recentPublications: number;
  publicationTopics: string[];
  lastPublicationDate: string;
  
  // Technographic signals
  usesInVitroModels: boolean;
  openToNAMs: boolean;
  currentTechStack: string[];
  
  // Scoring
  totalScore: number;
  roleScore: number;
  scientificScore: number;
  companyScore: number;
  locationScore: number;
  topReasons: string[];
  
  // BD recommendations
  recommendedAction: 'Email Intro' | 'Conference Meet' | 'Warm LinkedIn Outreach' | 'Direct Call' | 'Partner Intro';
  actionRationale: string;
  
  // Metadata
  linkedinUrl?: string;
  conferenceAppearances: string[];
  researchKeywords: string[];
}

export interface FilterCriteria {
  titles: string[];
  keywords: string[];
  regions: string[];
  scoreRange: [number, number];
  fundingStages: string[];
}

export interface ScoreBreakdown {
  category: string;
  score: number;
  maxScore: number;
  factors: string[];
}
