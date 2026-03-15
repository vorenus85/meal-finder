import type { Meal } from '../types/meal';

export class MealCard {
  private readonly meal: Meal;

  constructor(meal: Meal) {
    this.meal = meal;
  }

  public render(): string {
    return `
      <div class="meal-card">
        <div class="meal-image">
          <img src="${this.meal.strMealThumb}" alt="${this.meal.strMeal}">
        </div>
        <h3 class="meal-title">${this.meal.strMeal}</h3>
        <button class="show-meal-recipe" data-id="${this.meal.idMeal}">View recipe</button>
      </div>
    `;
  }
}
