// Cremelle's menu – taken from the "Cremelle's Menu" post on Instagram (@cremelle.lb).
// Prices are in US dollars. Please double-check them against the original menu before submitting.

import browniessImg from "../Photos/browniess.jpg";
import cookiesImg from "../Photos/Cookies.jpg";
import croissantssImg from "../Photos/croissantss.jpg";
import CinnamonImg from "../Photos/CinnamonRolls.jpg";
import ballsImg from "../Photos/balls.jpg";
import donutsImg from "../Photos/donuts.jpg";
import cakeImg from "../Photos/cake.jpg";
import tartsImg from "../Photos/tarts.jpg";
import tiramisuImg from "../Photos/tiramisu.jpg";

export const INSTAGRAM_URL = "https://www.instagram.com/cremelle.lb/";
export const INSTAGRAM_DM_URL = "https://ig.me/m/cremelle.lb";

// category -> label, emoji (used when there is no photo) and an optional image
export const categoryInfo = {
  Cookies: { emoji: "🍪", note: "Soft, chewy and baked fresh", image: cookiesImg },
  Brownies: { emoji: "🍫", note: "Fudgy and rich", image: browniessImg },
  Balls: { emoji: "🍡", note: "Sold by the dozen", image: ballsImg },
  Donuts: { emoji: "🍩", note: "Glazed, filled and topped", image: donutsImg },
  Cakes: { emoji: "🍰", note: "For every occasion", image: cakeImg },
  Rolls: { emoji: "🌀", note: "Warm cinnamon swirls", image: CinnamonImg },
  Tarts: { emoji: "🥧", note: "Sold by the dozen", image: tartsImg },
  Croissants: { emoji: "🥐", note: "Flaky and filled", image: croissantssImg },
  Tiramisu: { emoji: "☕", note: "Creamy and light", image: tiramisuImg },
};

export const categories = ["All", ...Object.keys(categoryInfo)];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// [category, name, price, unit, customImage]
const raw = [
  ["Cookies", "Vanilla cookie", 3],
  ["Cookies", "Chocolate cookie", 3],
  ["Cookies", "Apple crumble cookie", 3],
  ["Cookies", "Birthday cookie", 3],
  ["Cookies", "Nutella biscuit cookie", 4],
  ["Cookies", "Lemon cookie", 3.5],
  ["Cookies", "Biscoff cookie", 4],
  ["Cookies", "Red velvet cookie", 3.5],

  ["Brownies", "Classic brownie", 3],

  ["Balls", "Coconut balls", 8, "dozen"],
  ["Balls", "Oreo balls", 8.5, "dozen"],
  ["Balls", "Kinder balls", 8.5, "dozen"],

  ["Donuts", "Nutella donut", 4],
  ["Donuts", "Lemon glazed donut", 3],
  ["Donuts", "Strawberry glazed donut", 4],
  ["Donuts", "Ferrero Rocher donut", 5],
  ["Donuts", "Birthday donut", 4],
  ["Donuts", "Oreo donut", 4],

  ["Cakes", "Orange cake", 15],
  ["Cakes", "Lemon drizzle loaf cake", 20],
  ["Cakes", "Carrot walnut cake", 20],
  ["Cakes", "Marble cake", 18],
  ["Cakes", "Chocolate cornflakes cake", 25],
  ["Cakes", "Apple cake", 20],
  ["Cakes", "Blueberry cake", 20],

  ["Rolls", "Cinnamon rolls", 3],

  ["Tarts", "Fruit tarts", 18, "dozen"],

  ["Croissants", "Nutella croissant", 2.5],
  ["Croissants", "Kitkat croissant", 2.5],
  ["Croissants", "Apple crumble croissant", 2],

  ["Tiramisu", "Mango tiramisu", 3],
  ["Tiramisu", "Strawberry tiramisu", 3],
];

export const products = raw.map(([category, name, price, unit = "", customImage]) => ({
  id: slug(name),
  category,
  name,
  price,
  unit,
  emoji: categoryInfo[category].emoji,
  image: customImage ?? categoryInfo[category].image,
  description: `${name} – freshly baked, homemade and made with love.`,
}));

export const formatPrice = (n) => (Number.isInteger(n) ? `${n}$` : `${n.toFixed(1)}$`);