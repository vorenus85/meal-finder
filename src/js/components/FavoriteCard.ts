import type { MealCardData } from '../models/MealCardData';

export class FavoriteCard {
  private readonly meal: MealCardData;

  constructor(meal: MealCardData) {
    this.meal = meal;
  }

  public render(): string {
    return `
      <div class="meal-card" data-id="${this.meal.idMeal}">
        <div class="meal-image">
          <img src="${this.meal.strMealThumb}" alt="${this.meal.strMeal}">
        </div>
        <div class="meal-card-body">
          <h3 class="meal-title">${this.meal.strMeal}</h3>
          <div class="meal-actions">
            <button class="show-meal-recipe material-symbols-outlined" >visibility</button>
            <button class="remove-favorite material-symbols-outlined">delete</button>
          </div>
        </div>
      </div>
    `;
  }
}
