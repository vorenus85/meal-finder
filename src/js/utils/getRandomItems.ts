import type { MealCardData } from '../models/MealCardData';

export function getRandomItems(
  array: MealCardData[],
  count: number = 6,
): MealCardData[] {
  if (count >= array.length) {
    return [...array];
  }

  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
