import { Link } from "react-router-dom";
import { INSTAGRAM_URL } from "../data/products.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand light">
            <img src="./images/logo.png" alt="" width="46" height="46" />
            <span>Cremelle</span>
          </div>
          <p className="footer-tag">sweetness in every bite</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Find us</h4>
          <p>Beirut, Lebanon</p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@cremelle.lb on Instagram</a>
          <p>Orders via DM</p>
        </div>
      </div>
      <p className="copyright">
        © {new Date().getFullYear()} Cremelle home bakery · CSCI426 student project · Built with React,
        GSAP, Lenis and React Bits
      </p>
    </footer>
  );
}
