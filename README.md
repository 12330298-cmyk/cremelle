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
```

## Editing the content
- Menu items and prices: `src/data/products.js`
- Colors and fonts: variables at the top of `src/styles.css`
- Photos: put files in `public/images/` and reference them in `src/data/products.js`

## Deployment
**Vercel / Netlify:** import the GitHub repo, build command `npm run build`, output directory `dist`.

**GitHub Pages:** `npm i -D gh-pages`, add `"deploy": "gh-pages -d dist"` to `scripts`,
then run `npm run build && npm run deploy`.

## Screenshots
_Add screenshots of Home, Menu, Item page, Cart and the mobile view here (put the images in a `screenshots/` folder)._

## Technologies
React 19, React Router 6, Vite, GSAP (+ ScrollTrigger, SplitText, @gsap/react), Lenis, motion, plain CSS.

## Credits and citations
- [GSAP](https://github.com/greensock/GSAP) by GreenSock – animation library
- [Lenis](https://github.com/darkroomengineering/lenis) by Darkroom Engineering – smooth scroll
- [React Bits](https://github.com/DavidHDev/react-bits) by David Haz (MIT + Commons Clause) – the components in
  `src/components/reactbits/` (SplitText, ScrollVelocity, SpotlightCard, Magnet) are copied from this library
- Brand name, logo, menu and photos belong to Cremelle (@cremelle.lb) and are used here for a course project
- Fonts: Cormorant Garamond, Jost, Pinyon Script (Google Fonts)
