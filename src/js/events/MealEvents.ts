export class MealEvents {
  constructor() {
    this.closeRecipeModal();
  }

  public closeRecipeModal(): void {
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
