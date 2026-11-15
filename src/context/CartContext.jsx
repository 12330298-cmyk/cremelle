import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => load("cremelle-cart", []));
  const [orders, setOrders] = useState(() => load("cremelle-orders", []));

  useEffect(() => {
    localStorage.setItem("cremelle-cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("cremelle-orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, qty = 1) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          unit: product.unit,
          emoji: product.emoji,
          qty,
        },
      ];
    });

  const changeQty = (id, delta) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
    );

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const placeOrder = (customer) => {
    const order = {
      id: "CR-" + Math.floor(1000 + Math.random() * 9000),
      items,
      total,
      customer,
      createdAt: Date.now(),
    };
    setOrders((prev) => [order, ...prev]);
    setItems([]);
    return order;
  };

  return (
    <CartContext.Provider
      value={{ items, orders, total, count, addToCart, changeQty, removeItem, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
