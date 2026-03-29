# FOOD 101 — Nigerian Food Delivery App

A full-featured food ordering web app built with Vite + React, Tailwind CSS, Framer Motion, and Zustand.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deploy

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

### Deploy to Vercel
1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Framework: **Vite** (auto-detected)
4. Click Deploy — done ✅

## 🗂️ Project Structure

```
food-101/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx                  # Root router
│   ├── main.jsx                 # React entry point
│   ├── index.css                # Tailwind + CSS variables
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── MobileNav.jsx
│   │   ├── shared/
│   │   │   ├── PromoBanner.jsx
│   │   │   └── FloatingCartButton.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       └── Badge.jsx
│   ├── hooks/
│   │   ├── useCart.js           # Zustand cart store (persisted)
│   │   ├── useAuth.js           # Zustand auth store (persisted)
│   │   └── useTheme.js          # Dark / light mode (persisted)
│   ├── lib/
│   │   ├── data.js              # All food data + helpers
│   │   └── utils.js             # cn() + formatPrice()
│   └── pages/
│       ├── HomePage.jsx
│       ├── MenuPage.jsx
│       ├── CartPage.jsx
│       ├── CheckoutPage.jsx
│       ├── OrdersPage.jsx
│       ├── TrackPage.jsx
│       ├── ProfilePage.jsx
│       ├── LoginPage.jsx
│       ├── SignupPage.jsx
│       └── NotFoundPage.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| Vite 5 | Build tool |
| React 18 | UI framework |
| React Router 6 | Client-side routing |
| Tailwind CSS 3 | Styling |
| Framer Motion 11 | Animations |
| Zustand 4 | State management |
| Lucide React | Icons |

## 🍽️ Features

- Browse 18 authentic Nigerian dishes across 8 categories
- Search & filter by category and price
- Shopping cart with quantity controls (persisted in localStorage)
- Checkout with delivery details & payment method selection
- Order history with status tracking
- Live order tracking with delivery timeline
- User profile with editable info
- Auth (login / signup) — mock implementation ready for a real backend
- Rotating promo banner
- Dark mode toggle
- Fully responsive — mobile-first with bottom nav
