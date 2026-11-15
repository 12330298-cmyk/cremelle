# Cremelle 🧁 – Home Bakery Ordering Website

Frontend web application for **Cremelle home bakery** in Lebanon
(Instagram: [@cremelle.lb](https://www.instagram.com/cremelle.lb/)).
Built for **CSCI426 – Advanced Web Programming, Project Phase 1** (Theme 4: Restaurant Ordering System).

## Description

Customers can browse Cremelle's real menu (cookies, brownies, balls, donuts, cakes, rolls, tarts,
croissants and tiramisu), search and filter it, open an item page, build a cart, place an order and
follow its progress through *Received → Preparing → Ready → Delivered*.
Because Cremelle takes orders via Instagram DM, the cart can copy the order text and open the DM chat.

The design follows the brand: cream paper background, watercolor terracotta and brown colors,
calligraphic titles and the "freshly baked • homemade • made with love" motto.

### Pages
| Page | Route |
|------|-------|
| Home | `/` |
| Menu (search, filter, sort) | `/menu` |
| Item details (dynamic page) | `/menu/:id` |
| About | `/about` |
| Contact (validated form) | `/contact` |
| Cart, checkout and order tracking | `/cart` |

### Features
- ReactJS with React Router (HashRouter, works on GitHub Pages)
- Responsive layout for desktop, tablet and mobile (burger menu)
- Smooth scrolling with **Lenis**, synced with GSAP
- Scroll and intro animations with **GSAP** + ScrollTrigger (reveal, stagger, parallax)
- **React Bits** components: SplitText, ScrollVelocity, SpotlightCard, Magnet
- Cart and orders saved in `localStorage` (React Context)
- Respects `prefers-reduced-motion`

## Setup

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install
npm run dev      # development server
npm run build    # production build in /dist