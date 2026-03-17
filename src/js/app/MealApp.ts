import { MealApi } from '../api/mealApi';
import { Loader } from '../components/Loader';
import { MealCard } from '../components/MealCard';
import { MealModal } from '../components/MealModal';
import type { MealCardData } from '../models/MealCardData';
import type { MealModel } from '../models/MealModel';
import { MealEvents } from '../events/MealEvents';
import { FavoriteService } from '../services/FAvoriteService';

export class MealApp {
  private readonly api: MealApi;

  private readonly mealGrid: HTMLElement;
  private readonly categoryGrid: HTMLElement;
  events: MealEvents;
  favoriteService: FavoriteService;

  constructor() {
    this.categoryGrid = document.getElementById('category-grid') as HTMLElement;
    this.mealGrid = document.getElementById('meal-grid') as HTMLElement;

    this.api = new MealApi();
    this.events = new MealEvents();
    this.favoriteService = new FavoriteService();

    this.filterByCategory();
    this.viewRecipe();
    this.events.initModalEvent();
  }

  public renderMealCards(meals: MealCardData[]): void {
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
      }, 250);
    });
  }

  public viewRecipe(): void {
    document.addEventListener('click', async (event) => {
      const target = event.target as HTMLButtonElement;

      if (target.classList.contains('show-meal-recipe')) {
        target.disabled = true;

        const mealCard = target.closest('.meal-card') as HTMLElement;
        const mealId = mealCard?.dataset.id;

        if (!mealId) {
          console.error('Meal ID not found');
          return;
        }

        const result = await this.api.getMealById(mealId);
        this.renderModal(result as MealModel);
      }
    });
  }

  public renderModal(meal: MealModel): void {
    const modal = document.getElementById('meal-modal');

    if (!modal) return;

    modal.innerHTML = new MealModal(meal).render();

    document.body.classList.add('modal-active');
    modal.classList.add('active');
  }
}
