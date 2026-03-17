import { FavoriteCard } from '../components/FavoriteCard';
import { FavortiesEmpty } from '../components/FavoritesEmpty';
import type { MealCardData } from '../models/MealCardData';
import { getFavorites, saveFavorites } from '../storage/favoritesApi';

export class FavoriteService {
  private readonly favoritesList: HTMLElement;

  constructor() {
    this.favoritesList = document.getElementById('favorites-list')!;

    this.initFavoriteEvents();
    const favorites = getFavorites();
    this.render(favorites);
  }

  public initFavoriteEvents(): void {
    document.addEventListener('click', this.handleFavoriteClick);
  }

  private handleFavoriteClick = (event: Event): void => {
    const target = event.target as HTMLElement;

    const addBtn = target.closest('.add-favorite');
    const removeBtn = target.closest('.remove-favorite');

    if (!addBtn && !removeBtn) return;

    const button = (addBtn || removeBtn) as HTMLButtonElement;
    button.disabled = true;

    const card = button.closest('.meal-card') as HTMLElement;

    const meal = this.extractMealFromCard(card);

    if (addBtn) {
      this.add(meal);
    }

    if (removeBtn) {
      this.remove(meal);
    }
    const favorites = getFavorites();
    this.render(favorites);
  };

  private add(meal: MealCardData): void {
    const favorites = getFavorites();

    const exists = favorites.find((f) => f.idMeal === meal.idMeal);
    if (exists) return;

    saveFavorites([...favorites, meal]);
  }

  private remove(meal: MealCardData): void {
    const favorites = getFavorites();
    const updated = favorites.filter((f) => f.idMeal !== meal.idMeal);

    saveFavorites(updated);
  }

  private extractMealFromCard(card: HTMLElement): MealCardData {
    const idMeal = card.dataset.id;
    const strMeal = card.querySelector('.meal-title')?.textContent;
    const strMealThumb = (card.querySelector('img') as HTMLImageElement)?.src;

    if (!idMeal || !strMeal || !strMealThumb) {
      throw new Error('Invalid meal card');
    }

    return { idMeal, strMeal, strMealThumb };
  }

  public render(favorites: MealCardData[]): void {
    this.favoritesList.innerHTML = '';

    let html = '';

    if (favorites.length) {
      favorites.forEach((meal) => {
        html += new FavoriteCard(meal).render();
      });
    } else {
      html += new FavortiesEmpty().render();
    }

    this.favoritesList.insertAdjacentHTML('afterbegin', html);
  }
}
