import { MealApi } from './api/mealApi';
import { Loader } from './components/Loader';
import { MealCard } from './components/MealCard';
import { MealModal } from './components/MealModal';
import type { MealCardData } from './models/MealCardData';
import type { MealModel } from './models/MealModel';

export class MealApp {
  private readonly api: MealApi;

  private readonly mealGrid: HTMLElement;
  private readonly categoryGrid: HTMLElement;

  constructor() {
    this.categoryGrid = document.getElementById('category-grid') as HTMLElement;
    this.mealGrid = document.getElementById('meal-grid') as HTMLElement;

    this.api = new MealApi();

    this.filterByCategory();
    this.viewRecipe();
    this.initModalEvents();
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
        const mealId = target.dataset.id;

        const result = await this.api.getMealById(mealId as string);
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

  public initModalEvents(): void {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if (
        target.classList.contains('meal-modal-overlay') ||
        target.classList.contains('meal-modal-close')
      ) {
        document.getElementById('meal-modal')?.classList.remove('active');
        document.body.classList.remove('modal-active');
        const buttons =
          document.querySelectorAll<HTMLButtonElement>('.show-meal-recipe');

        buttons.forEach((btn) => {
          btn.disabled = false;
        });
      }
    });
  }
}
