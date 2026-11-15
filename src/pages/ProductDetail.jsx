import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products, formatPrice, INSTAGRAM_DM_URL } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import ProductArt from "../components/ProductArt.jsx";
import { gsap, useGSAP, useScrollAnimations, prefersReducedMotion } from "../lib/motion.js";

// Dynamic page: the :id in the URL decides which item is shown
export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const page = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !product) return;
      gsap.from(".detail > *", { opacity: 0, y: 40, duration: 0.9, stagger: 0.15, ease: "power3.out" });
    },
    { scope: page, dependencies: [id] }
  );
  useScrollAnimations(page, [id]);

  if (!product) {
    return (
      <section className="section container center-text">
        <h1 className="page-title">Item not found</h1>
        <p className="section-sub">This sweet is not on our menu.</p>
        <Link to="/menu" className="btn">Back to menu</Link>
      </section>
    );
  }

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div ref={page}>
      <section className="section container">
        <Link to="/menu" className="back">← Back to menu</Link>

        <div className="detail">
          <ProductArt product={product} large />
          <div className="detail-info">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="price big">
              {formatPrice(product.price)}
              {product.unit && <small> / {product.unit}</small>}
            </p>
            <p className="detail-text">{product.description}</p>

            <ul className="pill-list">
              <li>freshly baked</li>
              <li>homemade</li>
              <li>made with love</li>
            </ul>

            <div className="qty-row">
              <div className="qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
              </div>
              <button className="btn" onClick={handleAdd}>
                {added ? "Added ✓" : `Add to cart · ${formatPrice(product.price * qty)}`}
              </button>
            </div>

            <p className="muted">
              Want something custom?{" "}
              <a href={INSTAGRAM_DM_URL} target="_blank" rel="noreferrer">Send us a DM</a>.
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <>
            <h2 className="section-title left" data-reveal>You may also like</h2>
            <div className="related" data-reveal-group>
              {related.map((p) => (
                <Link key={p.id} to={`/menu/${p.id}`} className="mini">
                  <span className="mini-emoji">{p.emoji}</span>
                  <div>
                    <strong>{p.name}</strong>
                    <small>{formatPrice(p.price)}</small>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
