import { useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SplitText from "../components/reactbits/SplitText.jsx";
import ProductArt from "../components/ProductArt.jsx";
import BuildBox from "../components/BuildBox.jsx";
import { useCart } from "../context/CartContext.jsx";
import { products, categories, categoryInfo, formatPrice } from "../data/products.js";
import { useScrollAnimations } from "../lib/motion.js";

const ICONS = {
  Cookies: "🍪",
  Brownies: "🍫",
  Balls: "🍡",
  Donuts: "🍩",
  Cakes: "🍰",
  Rolls: "🌀",
  Tarts: "🥧",
  Croissants: "🥐",
  Tiramisu: "☕",
};
const icon = (c) => ICONS[c] || "🧁";

// "Winter picks" strip: matched by name keywords, so no change to products.js is needed.
const WINTER_WORDS = ["cinnamon", "apple", "carrot", "red velvet", "nutella croissant"];

export default function Menu() {
  const page = useRef(null);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const category = categories.includes(params.get("cat")) ? params.get("cat") : "All";
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const [view, setView] = useState("list"); // "list" | "grid"
  const [boxOpen, setBoxOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(null);
  const { addToCart } = useCart();

  const visible = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  // group by category so the menu looks like the printed "Cremelle's Menu"
  const groups = useMemo(() => {
    const map = new Map();
    visible.forEach((p) => {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category).push(p);
    });
    return [...map.entries()];
  }, [visible]);

  const winter = useMemo(
    () =>
      products
        .filter((p) => WINTER_WORDS.some((w) => p.name.toLowerCase().includes(w)))
        .slice(0, 6),
    []
  );

  useScrollAnimations(page, [category, query, sort, view]);

  const add = (p) => {
    addToCart(p);
    setJustAdded(p.id);
    setTimeout(() => setJustAdded(null), 1200);
  };

  const surprise = () => {
    const p = products[Math.floor(Math.random() * products.length)];
    navigate(`/menu/${p.id}`);
  };

  const AddBtn = ({ p }) => (
    <button
      className={`add ${justAdded === p.id ? "ok" : ""}`}
      onClick={() => add(p)}
      aria-label={`Add ${p.name} to cart`}
    >
      {justAdded === p.id ? "✓" : "+"}
    </button>
  );

  return (
    <div ref={page}>
      <section className="page-head">
        <SplitText text="Cremelle's Menu" tag="h1" className="page-title" splitType="chars" delay={45} textAlign="center" />
        <p className="hero-script small">freshly baked • homemade • made with love</p>
      </section>

      <section className="section container tight">
        {/* Winter picks */}
        {winter.length > 0 && category === "All" && !query && (
          <div className="seasonal" data-reveal>
            <div className="seasonal-head">
              <span className="seasonal-tag">❄️ Winter picks</span>
              <span className="seasonal-sub">cozy bakes for cold days</span>
            </div>
            <div className="seasonal-row">
              {winter.map((p) => (
                <div className="seasonal-card" key={p.id}>
                  <span className="seasonal-icon">{p.emoji || icon(p.category)}</span>
                  <Link to={`/menu/${p.id}`} className="seasonal-name">
                    {p.name}
                  </Link>
                  <span className="seasonal-price">{formatPrice(p.price)}</span>
                  <AddBtn p={p} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="toolbar">
          <input
            type="search"
            placeholder="Search the menu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search the menu"
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by price">
            <option value="default">Sort: menu order</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>

        <div className="chips-row">
          <div className="chips">
            {categories.map((c) => (
              <button
                key={c}
                className={`chip ${c === category ? "active" : ""}`}
                onClick={() => (c === "All" ? setParams({}) : setParams({ cat: c }))}
              >
                {c !== "All" && <span className="chip-ico">{icon(c)}</span>}
                {c}
              </button>
            ))}
          </div>

          <div className="view-tools">
            <button
              className={`surprise ${boxOpen ? "on" : ""}`}
              onClick={() => setBoxOpen((o) => !o)}
              type="button"
            >
              🎁 Build your box
            </button>
            <button className="surprise" onClick={surprise} type="button">
              🎲 Surprise me
            </button>
            <div className="view-toggle" role="group" aria-label="Change view">
              <button
                type="button"
                className={view === "list" ? "on" : ""}
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
              >
                ☰ List
              </button>
              <button
                type="button"
                className={view === "grid" ? "on" : ""}
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
              >
                ▦ Cards
              </button>
            </div>
          </div>
        </div>

        {boxOpen && <BuildBox onClose={() => setBoxOpen(false)} />}

        {groups.length === 0 ? (
          <p className="empty">Nothing found. Try another search.</p>
        ) : (
          <div className={`menu-sheet ${view === "grid" ? "is-grid" : ""}`}>
            {groups.map(([name, items]) => (
              <div className="menu-group" key={name} data-reveal>
                <h2 className="menu-cat">
                  <span className="menu-cat-ico">{icon(name)}</span>
                  {name.toLowerCase()}:
                </h2>
                <p className="menu-note">{categoryInfo[name].note}</p>

                {view === "list" ? (
                  <ul>
                    {items.map((p) => (
                      <li key={p.id} className="menu-row">
                        <Link to={`/menu/${p.id}`} className="menu-name">
                          {p.name}
                          {p.unit && <small> / {p.unit}</small>}
                        </Link>
                        {p.badge && <span className="badge">{p.badge}</span>}
                        <span className="leader" aria-hidden="true" />
                        <span className="menu-price">{formatPrice(p.price)}</span>
                        <AddBtn p={p} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="card-grid">
                    {items.map((p) => (
                      <li key={p.id} className="menu-card">
                        {p.badge && <span className="badge floating">{p.badge}</span>}
                        <Link to={`/menu/${p.id}`} className="menu-card-art" aria-label={p.name}>
                          <ProductArt product={{ ...p, emoji: p.emoji || icon(p.category) }} />
                        </Link>
                        <Link to={`/menu/${p.id}`} className="menu-card-name">
                          {p.name}
                        </Link>
                        {p.unit && <small className="menu-card-unit">per {p.unit}</small>}
                        {p.desc && <p className="menu-card-desc">{p.desc}</p>}
                        <div className="menu-card-foot">
                          <span className="menu-price">{formatPrice(p.price)}</span>
                          <AddBtn p={p} />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="menu-foot" data-reveal>
          Prices in US dollars · Custom orders and special requests via Instagram DM
        </p>
      </section>
    </div>
  );
}