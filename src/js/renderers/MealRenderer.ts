export class MealRenderer {
  constructor() {}

  public showLoader(): void {
    this.mealGrid.classList.add('loading');
    this.mealGrid.innerHTML = new Loader().render();
  }
}
