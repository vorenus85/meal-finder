import type { MealCardData } from '../models/MealCardData';

const STORAGE_KEY = 'favoriteMeals';

export function getFavorites(): MealCardData[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  try {
    return JSON.parse(data) as MealCardData[];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: MealCardData[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}
