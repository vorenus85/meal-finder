import { Loader } from '../components/Loader';
import { MealCard } from '../components/MealCard';
import { MealModal } from '../components/MealModal';
import type { MealCardData } from '../models/MealCardData';
import type { MealModel } from '../models/MealModel';
import { getFavorites } from '../storage/favoritesApi';

export class MealRenderer {
  private readonly messages: HTMLElement;
  private readonly mealGrid: HTMLElement;
  constructor() {
    this.mealGrid = document.getElementById('meal-grid') as HTMLElement;
    this.mealGrid = document.getElementById('meal-grid') as HTMLElement;
    this.messages = document.getElementById('messages') as HTMLElement;
  }

  public renderError(message: string): void {
    this.messages.innerHTML = `
    <div class="meal-error">
      <p class="meal-error__text">${message}</p>
    </div>
  `;
  }

  public mealGridLoader(): void {
    this.mealGrid.classList.add('loading');
    this.mealGrid.innerHTML = new Loader().render();
  }

  public recipeModal(meal: MealModel): void {
    const modal = document.getElementById('meal-modal');

    if (!modal) return;

    modal.innerHTML = new MealModal(meal).render();

    document.body.classList.add('modal-active');
    modal.classList.add('active');
  }

  public mealCards(meals: MealCardData[]): void {
    this.mealGrid.innerHTML = '';

    let html = '';

    meals.forEach((meal) => {
      html += new MealCard(meal, this.isFavorite(meal.idMeal)).render();
    });

    this.mealGrid.insertAdjacentHTML('afterbegin', html);
  }

  private isFavorite(idMeal: string): boolean {
    const favorites = getFavorites();

    return favorites.find((meal) => meal.idMeal === idMeal) !== undefined;
  }

  public removeGridLoader() {
    this.mealGrid.innerHTML = '';
    setTimeout(() => {
      this.mealGrid.classList.remove('loading');
    }, 2000);
  }

  public removeError() {
    this.messages.innerHTML = '';
  }
}
