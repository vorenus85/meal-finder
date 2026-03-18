# 🍽️ Meal Finder

A modern **meal discovery application** built with a focus on clean architecture, modular design, and scalable frontend patterns.

This project demonstrates how to structure a medium-sized frontend application using **TypeScript, event delegation, and separation of concerns**.

---

## 🚀 Features

- 🔍 Search meals by main ingredient
- 🗂️ Filter meals by category
- 🎲 Random meal suggestions
- ❤️ Add/remove favorites (LocalStorage)
- 📖 View detailed recipe in modal
- ⚡ Fast and responsive UI
- 📱 Fully responsive layout

---

## 🧠 Architecture Highlights

This project is intentionally structured to go beyond a simple "tutorial app".

### Key concepts:

- **Separation of concerns**
  - `MealApp` → orchestrator
  - `MealEvents` → event handling
  - `MealRenderer` → UI rendering
  - `FavoriteService` → state management

- **Event delegation**
  - Efficient handling of dynamic UI elements

- **Reusable utilities**
  - e.g. `getRandomItems`

- **Error & loading states**
  - User-friendly feedback handling

---

## 🛠️ Tech Stack

- TypeScript
- Vanilla JavaScript (no framework)
- SCSS
- REST API integration

---

## 📡 API

This project uses the public [TheMealDB API](https://www.themealdb.com/api.php)

Examples:

- Search by ingredient
- Filter by category
- Lookup meal details

---

## 📂 Project Structure

```
src/
 ├── api/
 ├── components/
 ├── events/
 ├── models/
 ├── renderers/
 ├── services/
 ├── utils/
 └── app/
```

---

## ⚙️ Getting Started

```bash
npm install
npm run dev
```

---

## 🎯 Purpose of the Project

This is a **portfolio project** focused on:

- Writing maintainable frontend code
- Practicing application architecture
- Demonstrating real-world patterns without frameworks

---

## 🔮 Future Improvements

- Skeleton loading states
- Better error handling UI
- Pagination / infinite scroll
- Backend integration (full-stack version)

---

## 👨‍💻 Author

János Perge
Frontend Developer

---
