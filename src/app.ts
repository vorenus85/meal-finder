import { MealApi } from './api/mealApi';
import { Loader } from './components/Loader';
import { MealCard } from './components/MealCard';
import type { Meal } from './types/meal';

export class MealApp {
  private readonly api: MealApi;

  private readonly mealGrid: HTMLElement;
  private readonly categoryGrid: HTMLElement;

  constructor() {
    this.categoryGrid = document.getElementById('category-grid') as HTMLElement;
    this.mealGrid = document.getElementById('meal-grid') as HTMLElement;

    this.api = new MealApi();

    this.filterByCategory();
  }

  public renderMealCards(meals: Meal[]): void {
    this.mealGrid.innerHTML = '';

    let html = '';

    meals.forEach((meal) => {
      html += new MealCard(meal).render();
    });

    this.mealGrid.insertAdjacentHTML('afterbegin', html);
  }

  public showLoader(): void {
    this.mealGrid.classList.add('loading');
    this.mealGrid.innerHTML = new Loader().render();
  }

  public filterByCategory(): void {
    this.categoryGrid.addEventListener('click', async (event: Event) => {
      const target = event.target as HTMLElement;

      const card = target.closest('.category-card') as HTMLElement;

      if (!card) return;

      const cards = this.categoryGrid.querySelectorAll('.category-card');

      cards.forEach((c) => c.classList.remove('active'));

      card.classList.add('active');

      const category = card.textContent?.trim();

      if (!category) return;

      this.showLoader();

      const { meals } = await this.api.getMealByCategory(category);

      setTimeout(() => {
        this.renderMealCards(meals);
        this.mealGrid.classList.remove('loading');
      }, 500);
    });
  }
}
