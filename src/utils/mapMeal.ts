import type { Ingredient } from '../models/ingredient';
import type { Meal } from '../models/Meal';
import type { MealModel } from '../models/MealModel';

export function mapMeal(meal: Meal): MealModel {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}` as keyof Meal] as string;
    const measure = meal[`strMeasure${i}` as keyof Meal] as string;

    if (name && name.trim()) {
      ingredients.push({
        name,
        measure: measure?.trim() || '',
      });
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    thumbnail: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(',') : null,
    youtube: meal.strYoutube,
    ingredients,
    source: meal.strSource,
  };
}
