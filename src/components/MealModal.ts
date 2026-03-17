import type { MealModel } from '../models/MealModel';

export class MealModal {
  private readonly meal: MealModel;
  constructor(meal: MealModel) {
    this.meal = meal;
  }

  public render(): string {
    const youtubeUrl = this.getYoutubeEmbedUrl(this.meal.youtube);

    return `
    <div class="meal-modal active">
      <div class="meal-modal-overlay"></div>

      <div class="meal-modal-container">
        <div class="meal-modal-header">
          <button class="meal-modal-close">✕</button>
          <h2>${this.meal.name}</h2>
        </div>

        <div class="meal-modal-body">
          ${
            youtubeUrl
              ? `<iframe 
                  src="${youtubeUrl}" 
                  title="${this.meal.name}" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
                </iframe>`
              : ''
          }

          <div class="meal-modal-content">
            <p class="meal-modal-category">
              ${this.meal.category} • ${this.meal.area}
            </p>

            <h3>Ingredients</h3>
            <ul class="ingredient-list">
              ${this.meal.ingredients
                .map(
                  (i) => `
                    <li>
                      <img src="https://themealdb.com/images/ingredients/${this.toSnakeCase(i.name)}-small.png" />
                      ${i.measure} ${i.name}
                    </li>
                  `,
                )
                .join('')}
            </ul>

            <h3>Instructions</h3>
            <p>${this.meal.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  }

  private getYoutubeEmbedUrl(url: string): string {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  private toSnakeCase(str: string): string {
    return str.trim().toLowerCase().replaceAll(/\s+/g, '_');
  }
}
