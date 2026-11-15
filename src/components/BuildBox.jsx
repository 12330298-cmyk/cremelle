import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { products, formatPrice } from "../data/products.js";

const SIZES = [6, 12];
const BOX_CATEGORY = "Cookies";

export default function BuildBox({ onClose }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState(6);
  const [picked, setPicked] = useState({});
  const [done, setDone] = useState(false);

  const cookies = useMemo(() => products.filter((p) => p.category === BOX_CATEGORY), []);

  const count = Object.values(picked).reduce((a, b) => a + b, 0);
  const total = cookies.reduce((s, p) => s + p.price * (picked[p.id] || 0), 0);
  const full = count === size;

  const change = (id, delta) =>
    setPicked((prev) => {
      const cur = prev[id] || 0;
      const sum = Object.values(prev).reduce((a, b) => a + b, 0);
      if (delta > 0 && sum >= size) return prev;
      if (cur + delta < 0) return prev;
      return { ...prev, [id]: cur + delta };
    });

  const chooseSize = (s) => {
    setSize(s);
    if (count > s) setPicked({});
  };

  const fillRandom = () => {
    const next = { ...picked };
    let left = size - count;
    while (left > 0 && cookies.length) {
      const p = cookies[Math.floor(Math.random() * cookies.length)];
      next[p.id] = (next[p.id] || 0) + 1;
      left--;
    }
    setPicked(next);
  };

  const addBox = () => {
    cookies.forEach((p) => picked[p.id] && addToCart(p, picked[p.id]));
    setPicked({});
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <div className="box-panel" data-reveal>
      <div className="box-head">
        <div>
          <h3 className="box-title">🎁 Build your box</h3>
          <p className="box-sub">pick your favorite cookies, mix as you like</p>
        </div>
        <button className="box-close" onClick={onClose} aria-label="Close box builder">
          ✕
        </button>
      </div>

      <div className="box-sizes">
        {SIZES.map((s) => (
          <button
            key={s}
            type="button"
            className={`chip ${s === size ? "active" : ""}`}
            onClick={() => chooseSize(s)}
          >
            Box of {s}
          </button>
        ))}
        <button type="button" className="surprise" onClick={fillRandom} disabled={full}>
          🎲 Fill the rest
        </button>
      </div>

      <div className="box-progress" aria-label={`${count} of ${size} cookies`}>
        <div className="box-progress-bar" style={{ width: `${(count / size) * 100}%` }} />
      </div>
      <p className="box-count">
        {count} / {size} cookies
      </p>

      <ul className="box-list">
        {cookies.map((p) => (
          <li key={p.id} className={`box-item ${picked[p.id] ? "has" : ""}`}>
            <span className="box-emoji">{p.emoji || "🍪"}</span>
            <span className="box-name">{p.name}</span>
            <span className="box-price">{formatPrice(p.price)}</span>
            <div className="box-qty">
              <button type="button" onClick={() => change(p.id, -1)} disabled={!picked[p.id]} aria-label={`Remove ${p.name}`}>
                −
              </button>
              <span>{picked[p.id] || 0}</span>
              <button type="button" onClick={() => change(p.id, 1)} disabled={full} aria-label={`Add ${p.name}`}>
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="box-foot">
        <span className="box-total">Total: {formatPrice(total)}</span>
        <button type="button" className="btn box-add" onClick={addBox} disabled={!full}>
          {done ? "✓ Added to cart" : full ? "Add box to cart" : `Pick ${size - count} more`}
        </button>
      </div>
    </div>
  );
}