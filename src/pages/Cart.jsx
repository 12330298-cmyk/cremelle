import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SplitText from "../components/reactbits/SplitText.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice, INSTAGRAM_DM_URL } from "../data/products.js";
import { useScrollAnimations } from "../lib/motion.js";

const STEPS = ["Received", "Preparing", "Ready", "Delivered"];
const STEP_MS = 8000; // each stage lasts 8 seconds (simulated order tracking)

// Text that is copied before opening the Instagram DM, because Cremelle takes orders by DM
const orderMessage = (order) =>
  [
    "Hi Cremelle! 🧁 I'd like to place an order:",
    ...order.items.map((i) => `• ${i.qty}× ${i.name} (${formatPrice(i.price * i.qty)})`),
    `Total: ${formatPrice(order.total)}`,
    `Order ref: ${order.id}`,
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `Address: ${order.customer.address}`,
  ].join("\n");

function Tracker({ order }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const step = Math.min(STEPS.length - 1, Math.floor((now - order.createdAt) / STEP_MS));

  return (
    <div className="order">
      <div className="order-head">
        <strong>Order {order.id}</strong>
        <span>{formatPrice(order.total)}</span>
      </div>
      <p className="muted">{order.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}</p>
      <ol className="steps">
        {STEPS.map((s, i) => (
          <li key={s} className={i <= step ? "done" : ""}>
            <span className="dot">{i <= step ? "✓" : i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Cart() {
  const page = useRef(null);
  const { items, orders, total, changeQty, removeItem, placeOrder } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [error, setError] = useState("");
  const [lastOrder, setLastOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useScrollAnimations(page, [items.length]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const checkout = (ev) => {
    ev.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Please fill in your name, phone and address.");
      return;
    }
    setError("");
    setCopied(false);
    setLastOrder(placeOrder(form));
    setForm({ name: "", phone: "", address: "" });
  };

  const sendOnInstagram = async () => {
    try {
      await navigator.clipboard.writeText(orderMessage(lastOrder));
      setCopied(true);
    } catch {
      setCopied(false);
    }
    window.open(INSTAGRAM_DM_URL, "_blank", "noopener");
  };

  return (
    <div ref={page}>
      <section className="page-head">
        <SplitText text="Your cart" tag="h1" className="page-title" splitType="chars" delay={50} textAlign="center" />
        <p className="hero-script small">almost ready to enjoy</p>
      </section>

      <section className="section container tight">
        {lastOrder && (
          <div className="success">
            <p>🎉 Order {lastOrder.id} placed! Track it below.</p>
            <p className="success-sub">
              Cremelle takes orders via Instagram DM. Tap the button to copy your order and open the chat,
              then paste it.
            </p>
            <button className="btn small" onClick={sendOnInstagram}>
              {copied ? "Copied ✓ Open chat again" : "Copy order & open Instagram DM"}
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <div className="empty">
            <p>Your cart is empty.</p>
            <Link to="/menu" className="btn">Browse the menu</Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-list">
              {items.map((i) => (
                <div className="cart-item" key={i.id}>
                  <span className="cart-emoji">{i.emoji}</span>
                  <div className="cart-info">
                    <strong>{i.name}</strong>
                    <small>
                      {formatPrice(i.price)}
                      {i.unit ? ` / ${i.unit}` : " each"}
                    </small>
                  </div>
                  <div className="qty">
                    <button onClick={() => changeQty(i.id, -1)} aria-label="Decrease">−</button>
                    <span>{i.qty}</span>
                    <button onClick={() => changeQty(i.id, 1)} aria-label="Increase">+</button>
                  </div>
                  <span className="line-total">{formatPrice(i.price * i.qty)}</span>
                  <button className="remove" onClick={() => removeItem(i.id)} aria-label="Remove">✕</button>
                </div>
              ))}
            </div>

            <form className="form summary" onSubmit={checkout} noValidate>
              <h3>Checkout</h3>
              <p className="total-row">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </p>
              <label>Name<input name="name" value={form.name} onChange={update} /></label>
              <label>Phone<input name="phone" value={form.phone} onChange={update} /></label>
              <label>Address<textarea name="address" rows="2" value={form.address} onChange={update} /></label>
              {error && <span className="error">{error}</span>}
              <button className="btn" type="submit">Place order</button>
            </form>
          </div>
        )}

        {orders.length > 0 && (
          <>
            <h2 className="section-title left" data-reveal>Order tracking</h2>
            <div className="orders">
              {orders.map((o) => (
                <Tracker key={o.id} order={o} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
