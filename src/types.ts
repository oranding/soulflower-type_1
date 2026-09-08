export type ArchetypeNumber = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type AirlineType = '討好航線' | '衝突航線' | '逃避航線';

export interface ArchetypeInfo {
  number: ArchetypeNumber;
  name: string;
  airline: AirlineType;
  description: string;
  growthFocus: string;
  energyQuality: string;
  interactionStyle: string;
}

export interface CalculationStep {
  dateString: string;
  year: number;
  month: number;
  day: number;
  digitsList: number[];
  initialFormula: string;
  initialSum: number;
  reductions: {
    from: number;
    digits: number[];
    formula: string;
    result: number;
  }[];
  finalNumber: ArchetypeNumber;
  isSpecialTen: boolean;
}

export interface CalculationResult {
  role: 'self' | 'partner';
  roleName: string;
  dateStr: string;
  year: number;
  month: number;
  day: number;
  archetype: ArchetypeInfo;
  steps: CalculationStep;
}

export type FontSizeMode = 'normal' | 'large' | 'extra-large';
