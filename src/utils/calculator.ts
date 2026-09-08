import { ArchetypeNumber, CalculationStep, CalculationResult } from '../types';
import { ARCHETYPES } from '../data/archetypes';

/**
 * Calculates the Archetype number and complete step-by-step breakdown
 * according to the workshop rules:
 * - Split all digits of Western birthday (YYYY-MM-DD)
 * - Sum all digits
 * - Repeatedly sum digits until reaching 2..10
 * - SPECIAL RULE: If reduced to exactly 10, STOP at 10!
 */
export function calculateArchetype(
  year: number,
  month: number,
  day: number,
  role: 'self' | 'partner',
  roleName: string
): CalculationResult | null {
  if (!year || !month || !day || year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  // Format date parts
  const yStr = year.toString().padStart(4, '0');
  const mStr = month.toString().padStart(2, '0');
  const dStr = day.toString().padStart(2, '0');
  const dateStr = `${yStr}-${mStr}-${dStr}`;

  // Collect all digits
  const allDigitsStr = `${yStr}${mStr}${dStr}`;
  const digitsList = allDigitsStr.split('').map((ch) => parseInt(ch, 10));

  // Step 1: Initial sum
  const initialSum = digitsList.reduce((acc, curr) => acc + curr, 0);
  const initialFormula = digitsList.join('+') + ` = ${initialSum}`;

  // Step 2: Reduction loop
  let currentSum = initialSum;
  const reductions: {
    from: number;
    digits: number[];
    formula: string;
    result: number;
  }[] = [];

  // Repeatedly sum digits until <= 10
  // Note: if it reaches 10, the condition currentSum > 10 is false, so it stops at 10!
  while (currentSum > 10) {
    const fromVal = currentSum;
    const stepDigits = fromVal.toString().split('').map((ch) => parseInt(ch, 10));
    const nextSum = stepDigits.reduce((acc, curr) => acc + curr, 0);
    const formula = stepDigits.join('+') + ` = ${nextSum}`;

    reductions.push({
      from: fromVal,
      digits: stepDigits,
      formula,
      result: nextSum,
    });

    currentSum = nextSum;
  }

  // Final check: if by any chance currentSum is less than 2 (theoretically impossible for Western dates),
  // ensure it is cast to ArchetypeNumber safely.
  const finalNum: ArchetypeNumber = (currentSum >= 2 && currentSum <= 10 ? currentSum : 2) as ArchetypeNumber;

  const steps: CalculationStep = {
    dateString: dateStr,
    year,
    month,
    day,
    digitsList,
    initialFormula,
    initialSum,
    reductions,
    finalNumber: finalNum,
    isSpecialTen: finalNum === 10,
  };

  const archetype = ARCHETYPES[finalNum];

  return {
    role,
    roleName,
    dateStr,
    year,
    month,
    day,
    archetype,
    steps,
  };
}

/**
 * Quick helper to parse standard YYYY-MM-DD string
 */
export function parseDateString(str: string): { year: number; month: number; day: number } | null {
  if (!str) return null;
  const parts = str.split('-').map((p) => parseInt(p, 10));
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    return null;
  }
  return { year: parts[0], month: parts[1], day: parts[2] };
}
