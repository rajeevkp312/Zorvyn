# Zorvyn Finance Dashboard (Frontend)

A modern finance dashboard UI built with React + Vite + Tailwind. It includes routing, a responsive layout, mock transactions, charts, a role-based UI (Admin/Viewer), and local persistence via `localStorage`.

## Features

- **Responsive layout**
  - Sidebar navigation + top navbar
  - Mobile sidebar overlay
- **Routing (React Router)**
  - Dashboard
  - Transactions
  - Insights (Admin-only)
- **Dashboard analytics (Recharts)**
  - Summary cards: Balance / Income / Expenses
  - Balance trend line chart
  - Category breakdown pie chart
- **Transactions**
  - Search by category/type
  - Filter by income/expense
  - Sort by date/amount
  - Admin-only CRUD (add/edit/delete)
  - Export visible transactions as **JSON** or **CSV**
- **Insights (Admin-only)**
  - Highest spending category
  - Month-over-month comparison
  - Savings insight
  - Recent transaction, average expense, top categories
- **Role-based UI**
  - **Viewer**: can view Dashboard and Transactions (read-only)
  - **Admin**: can access Insights + manage transactions
- **Local persistence**
  - Role, theme, and transactions are saved in `localStorage`
  - Falls back to seed mock data on first load
- **Dark mode**
  - Light/Dark toggle in the navbar
  - Uses Tailwind `dark:` classes (class-based dark mode)
- **Subtle animations**
  - Page transitions and modal open/close via Framer Motion

## Tech Stack

- React (Vite)
- Tailwind CSS
- React Router
- Zustand (global state + persistence)
- Recharts (charts)
- Framer Motion (animations)

## Setup

From the `frontend/` directory:

```bash
npm install
npm run dev
```

Open:

- `http://localhost:5173/`

## Folder Structure (high level)

```txt
src/
  components/
    charts/
    insights/
    transactions/
  context/
  data/
  pages/
  store/
```

## Role-Based UI (How it works)

- The selected role is stored in Zustand (`src/store/useAppStore.js`) and persisted to `localStorage`.
- Sidebar hides **Insights** for Viewer.
- Route guard protects `/insights` for non-admin users.
- Admin-only UI controls:
  - Add Transaction button
  - Edit/Delete actions in the Transactions table

## Persistence

The app stores data under the `localStorage` key:

- `zorvyn-finance`

It persists:

- `role`
- `theme`
- `transactions`
