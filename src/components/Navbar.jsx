import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <img src="./images/logo.png" alt="Cremelle logo" width="42" height="42" />
          <span>Cremelle</span>
        </Link>

        <button
          className="burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/menu" onClick={close}>Menu</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
          <NavLink to="/cart" className="cart-link" onClick={close}>
            Cart {count > 0 && <span className="badge">{count}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
