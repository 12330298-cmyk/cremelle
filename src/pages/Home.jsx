import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SplitText from "../components/reactbits/SplitText.jsx";
import ScrollVelocity from "../components/reactbits/ScrollVelocity.jsx";
import Magnet from "../components/reactbits/Magnet.jsx";
import ProductArt from "../components/ProductArt.jsx";
import { useCart } from "../context/CartContext.jsx";
import { products, formatPrice, INSTAGRAM_DM_URL } from "../data/products.js";
import { gsap, useGSAP, useScrollAnimations, prefersReducedMotion } from "../lib/motion.js";

import ballsImg from "../Photos/balls.jpg";
import tartsImg from "../Photos/tarts.jpg";
import cakeImg from "../Photos/cake.jpg";
import donutsImg from "../Photos/donuts.jpg";
import browniesImg from "../Photos/Brownies.jpg";
import cookiesImg from "../Photos/Cookies.jpg";
import croissantsImg from "../Photos/Croissants.jpg";
import tiramisuImg from "../Photos/tiramisu.jpg";
import cinnamonRollsImg from "../Photos/cinnamon-rolls.jpg";

const picks = ["classic-brownie", "cinnamon-rolls", "nutella-croissant", "chocolate-cookie"]
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean);

const galleryPhotos = [
  { src: ballsImg, alt: "Coconut, Oreo, and hazelnut chocolate truffle balls" },
  { src: tartsImg, alt: "Fruit tart with strawberries, mango, and blueberries" },
  { src: cakeImg, alt: "Caramel walnut and fig layer cake" },
  { src: donutsImg, alt: "Glazed and topped gourmet donuts" },
  { src: browniesImg, alt: "Fudgy chocolate walnut brownie" },
  { src: cookiesImg, alt: "Chocolate chunk cookies" },
  { src: croissantsImg, alt: "Flaky golden butter croissant" },
  { src: tiramisuImg, alt: "Layered tiramisu dessert cup" },
  { src: cinnamonRollsImg, alt: "Glazed homemade cinnamon rolls" },
];

const slotSpeeds = [50, 90, 40, 80];

export default function Home() {
  const page = useRef(null);
  const { addToCart } = useCart();
  const [startIndex, setStartIndex] = useState(0);

  // Rotate gallery photos every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % galleryPhotos.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Hero intro animation (GSAP timeline)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-croissant", { x: -120, y: -60, rotate: -14, opacity: 0, duration: 1.4 })
        .from(".hero-cinnamon", { x: 120, y: 80, rotate: 18, opacity: 0, duration: 1.4 }, "<0.1")
        .from(".hero-script", { opacity: 0, y: 20, duration: 0.9 }, "-=0.9")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
        .from(".hero-actions > *", { opacity: 0, y: 20, stagger: 0.12, duration: 0.7 }, "-=0.5");
    },
    { scope: page }
  );

  useScrollAnimations(page);

  const visiblePhotos = [0, 1, 2, 3].map(
    (offset) => galleryPhotos[(startIndex + offset) % galleryPhotos.length]
  );

  return (
    <div ref={page}>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <img className="hero-croissant" src="./images/croissant.jpg" alt="" aria-hidden="true" data-parallax="40" />
        <img className="hero-cinnamon" src="./images/cinnamon.jpg" alt="" aria-hidden="true" data-parallax="30" />

        <div className="container hero-inner">
          <SplitText
            text="Cremelle's"
            tag="h1"
            className="hero-title"
            splitType="chars"
            delay={60}
            duration={1.1}
            textAlign="center"
          />
          <p className="hero-script">home bakery</p>
          <p className="hero-sub">handcrafted desserts &amp; sweet creations ✨</p>
          <p className="hero-meta">📍 Lebanon &nbsp;|&nbsp; Orders via DM</p>

          <div className="hero-actions">
            <Magnet padding={60} magnetStrength={3}>
              <Link to="/menu" className="btn">View menu</Link>
            </Magnet>
            <Magnet padding={60} magnetStrength={3}>
              <a href={INSTAGRAM_DM_URL} target="_blank" rel="noreferrer" className="btn ghost">
                Order on Instagram
              </a>
            </Magnet>
          </div>
        </div>
      </section>

      {/* ---------- MARQUEE (React Bits ScrollVelocity) ---------- */}
      <section className="marquee" aria-label="Cremelle motto">
        <ScrollVelocity
          texts={["freshly baked • homemade • made with love •", "sweetness in every bite • sweetness in every bite •"]}
          velocity={60}
          numCopies={6}
          separator=" "
          fadeEdges
        />
      </section>

      {/* ---------- SWEET PICKS ---------- */}
      <section className="section alt">
        <div className="container">
          <h2 className="section-title" data-reveal>Sweet picks</h2>
          <div className="picks" data-reveal-group>
            {picks.map((p) => (
              <article className="pick" key={p.id}>
                <Link to={`/menu/${p.id}`}>
                  <ProductArt product={p} />
                </Link>
                <h3><Link to={`/menu/${p.id}`}>{p.name}</Link></h3>
                <div className="pick-foot">
                  <span className="price">{formatPrice(p.price)}</span>
                  <button className="btn small" onClick={() => addToCart(p)}>Add +</button>
                </div>
              </article>
            ))}
          </div>
          <div className="center">
            <Link to="/menu" className="btn ghost">See the full menu</Link>
          </div>
        </div>
      </section>

      {/* ---------- GALLERY (GSAP parallax + 2s motion rotation) ---------- */}
      <section className="section container">
        <h2 className="section-title" data-reveal>Made in small batches</h2>
        <p className="section-sub" data-reveal>
          So every bite reaches you at peak freshness.
        </p>
        <div className="gallery">
          {visiblePhotos.map((photo, idx) => (
            <figure key={idx} className="gallery-item" data-parallax={slotSpeeds[idx]}>
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                className="gallery-fade"
              />
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="cta">
        <div className="container center-text">
          <p className="hero-script small">orders via DM</p>
          <h2 data-reveal>Ready for something sweet?</h2>
          <div className="hero-actions" data-reveal>
            <Link to="/menu" className="btn">Start your order</Link>
            <Link to="/contact" className="btn ghost">Contact us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}