import { mapMeal } from '../utils/mapMeal';

const MEAL_API = import.meta.env.VITE_THEMEALDB_API;

export class MealApi {
  public async getMealByCategory(category: string) {
    const response = await fetch(`${MEAL_API}filter.php?c=${category}`);

    if (!response.ok) {
      throw new Error('Failed to fetch meals by category');
    }

    const data = await response.json();
    return data;
  }

  public async getMealById(mealId: string) {
    const response = await fetch(`${MEAL_API}lookup.php?i=${mealId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch meal by id');
    }

    const data = await response.json();

    if (!data.meals) return null;

    return mapMeal(data.meals[0]);
  }
}
