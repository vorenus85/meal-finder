import { MealApp } from './js/app/MealApp';
import './scss/style.scss';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new MealApp();
  await app.populateFirstLoad();
});
