import type { Ingredient } from './Ingredient';

export interface MealModel {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  tags: string[] | null;
  youtube: string;
  ingredients: Ingredient[];
  source: string;
}
