import { useRef } from "react";
import { Link } from "react-router-dom";
import SplitText from "../components/reactbits/SplitText.jsx";
import SpotlightCard from "../components/reactbits/SpotlightCard.jsx";
import { INSTAGRAM_URL } from "../data/products.js";
import { useScrollAnimations } from "../lib/motion.js";

const values = [
  { icon: "🥐", title: "Freshly baked", text: "We bake in small batches so every treat reaches you at peak freshness." },
  { icon: "🏡", title: "Homemade", text: "Everything is made by hand in our home kitchen, never mass produced." },
  { icon: "🤍", title: "Made with love", text: "From raw dough to the final detail, each sweet gets our full attention." },
];

export default function About() {
  const page = useRef(null);
  useScrollAnimations(page);

  return (
    <div ref={page}>
      <section className="page-head">
        <SplitText text="Our story" tag="h1" className="page-title" splitType="chars" delay={50} textAlign="center" />
        <p className="hero-script small">sweetness in every bite</p>
      </section>

      <section className="section container tight">
        <div className="about">
          <div className="about-art" data-reveal>
            <img src="./images/logo.png" alt="Cremelle logo" />
          </div>
          <div data-reveal>
            <h2>Cremelle home bakery</h2>
            <p>
              Cremelle is a home bakery in Lebanon creating handcrafted desserts and sweet
              creations: cookies, brownies, donuts, cakes, cinnamon rolls, tarts, croissants and
              tiramisu.
            </p>
            <p>
              We share every bake on Instagram at{" "}
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@cremelle.lb</a>, and
              orders are taken through direct messages. This website lets you explore the
              menu, build your order and send it to us in a few taps.
            </p>
            <Link to="/menu" className="btn">Explore the menu</Link>
          </div>
        </div>

        <h2 className="section-title" data-reveal>What we believe in</h2>
        <div className="features" data-reveal-group>
          {values.map((v) => (
            <SpotlightCard key={v.title} theme="light" spotlightColor="#d2733b" intensity={0.22} className="feature">
              <span className="feature-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  );
}
