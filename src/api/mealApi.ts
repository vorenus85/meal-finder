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
}
