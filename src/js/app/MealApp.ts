import { MealApi } from '../api/mealApi';
import type { MealModel } from '../models/MealModel';
import { MealEvents } from '../events/MealEvents';
import { FavoriteService } from '../services/FavoriteService';
import { getRandomItems } from '../utils/getRandomItems';
import { MealRenderer } from '../renderers/MealRenderer';
import { toSnakeCase } from '../utils/toSnakeCase';

export class MealApp {
  private readonly api: MealApi;

  private readonly mealGrid: HTMLElement;
  private readonly categoryGrid: HTMLElement;
  private readonly gridLoader: HTMLElement;
  private readonly filterForm: HTMLFormElement;
  private readonly filterSubmit: HTMLButtonElement;
  private readonly filterInput: HTMLInputElement;
  events: MealEvents;
  renderers: MealRenderer;
  favoriteService: FavoriteService;

  constructor() {
    this.gridLoader = document.getElementById(
      'loader-container',
    ) as HTMLElement;
    this.categoryGrid = document.getElementById('category-grid') as HTMLElement;

    this.filterForm = document.getElementById('filter-form') as HTMLFormElement;
    this.filterSubmit = document.getElementById(
      'filter-submit',
    ) as HTMLButtonElement;
    this.filterInput = document.getElementById(
      'filter-input',
    ) as HTMLInputElement;
    this.mealGrid = document.getElementById('meal-grid') as HTMLElement;

    this.api = new MealApi();
    this.events = new MealEvents();
    this.renderers = new MealRenderer();
    this.favoriteService = new FavoriteService();

    this.filterByCategory();
    this.filterByMainIngredient();
    this.viewRecipe();
  }

  public filterByMainIngredient(): void {
    this.filterForm.addEventListener('submit', async (event: Event) => {
      event.preventDefault();
      this.renderers.removeError();
      this.resetCategoryCardActive();
      this.filterSubmit.disabled = true;
      const ingredient = toSnakeCase(this.filterInput.value);

      try {
        this.renderers.mealGridLoader();
        const { meals } = await this.api.getMealByMainIngredient(ingredient);

        if (!meals) {
          this.renderers.removeGridLoader();
          this.renderers.renderError?.('No meals found.');
          return;
        }

        setTimeout(() => {
          this.renderers.mealCards(meals);
          this.mealGrid.classList.remove('loading');
        }, 250);
      } catch (error) {
        console.log(error);
        this.mealGrid.classList.remove('loading');
        this.renderers.renderError?.('Something went wrong. Please try again.');
      } finally {
        this.filterSubmit.disabled = false;
      }
    });
  }

  public filterByCategory(): void {
    this.categoryGrid.addEventListener('click', async (event: Event) => {
      this.renderers.removeError();
      this.resetCategoryCardActive();
      const target = event.target as HTMLElement;

      const card = target.closest('.category-card') as HTMLElement;
      if (!card) return;

      card.classList.add('active');

      const category = card.textContent?.trim();
      if (!category) return;

      try {
        this.renderers.mealGridLoader();

        const { meals } = await this.api.getMealByCategory(category);

        if (!meals) {
          this.renderers.renderError?.('No meals found.');
          return;
        }

        setTimeout(() => {
          this.renderers.mealCards(meals);
          this.mealGrid.classList.remove('loading');
        }, 250);
      } catch (error) {
        console.log(error);
        this.mealGrid.classList.remove('loading');
        this.renderers.renderError?.('Something went wrong. Please try again.');
        card.classList.remove('active');
      }
    });
  }

  public viewRecipe(): void {
    document.addEventListener('click', async (event) => {
      const target = event.target as HTMLButtonElement;

      if (target.classList.contains('show-meal-recipe')) {
        this.renderers.removeError();
        target.disabled = true;

        const mealCard = target.closest('.meal-card') as HTMLElement;
        const mealId = mealCard?.dataset.id;

        if (!mealId) {
          console.error('Meal ID not found');
          return;
        }

        const result = await this.api.getMealById(mealId);
        this.renderers.recipeModal(result as MealModel);
      }
    });
  }

  public async populateFirstLoad(): Promise<void> {
    const { meals } = await this.api.getMealByMainIngredient('chicken_breast');

    this.renderers.mealGridLoader();

    setTimeout(() => {
      this.renderers.mealCards(getRandomItems(meals));
      this.mealGrid.classList.remove('loading');
    }, 250);
  }

  private resetCategoryCardActive() {
    const categoryCards = this.categoryGrid.querySelectorAll('.category-card');
    categoryCards.forEach((c) => c.classList.remove('active'));
  }
}
