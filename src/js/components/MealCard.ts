import type { MealCardData } from '../models/MealCardData';

export class MealCard {
  private readonly meal: MealCardData;
  isFavorite: boolean;

  constructor(meal: MealCardData, isFavorite: boolean) {
    this.meal = meal;
    this.isFavorite = isFavorite;
  }

  public render(): string {
    return `
      <div class="meal-card" data-id="${this.meal.idMeal}">
        <div class="meal-image">
          <img src="${this.meal.strMealThumb}" alt="${this.meal.strMeal}">
        </div>
        <h3 class="meal-title">${this.meal.strMeal}</h3>
        <div class="meal-actions">
          <button class="show-meal-recipe meal-recipe-btn" >View recipe</button>
          <button class="meal-favorite-btn add-favorite material-symbols-outlined ${this.isFavorite ? 'active' : ''}" title="Add to favorites" ${this.isFavorite ? 'disabled' : ''}>favorite</button>
        </div>
        
      </div>
    `;
  }
}
