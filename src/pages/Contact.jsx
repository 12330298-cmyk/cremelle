import { useRef, useState } from "react";
import SplitText from "../components/reactbits/SplitText.jsx";
import { INSTAGRAM_URL, INSTAGRAM_DM_URL } from "../data/products.js";
import { useScrollAnimations } from "../lib/motion.js";

export default function Contact() {
  const page = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useScrollAnimations(page);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // Frontend-only project: there is no server, so we only show a confirmation.
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div ref={page}>
      <section className="page-head">
        <SplitText text="Say hello" tag="h1" className="page-title" splitType="chars" delay={50} textAlign="center" />
        <p className="hero-script small">cravings, questions &amp; custom orders</p>
      </section>

      <section className="section container tight">
        <div className="contact-grid" data-reveal-group>
          <div className="info-box">
            <h3>Get in touch</h3>
            <p>📍 Beirut, Lebanon</p>
            <p>
              📸{" "}
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@cremelle.lb</a>
            </p>
            <p>💌 Orders are taken via Instagram DM</p>
            <a className="btn" href={INSTAGRAM_DM_URL} target="_blank" rel="noreferrer">
              Message us on Instagram
            </a>
          </div>

          <form className="form" onSubmit={submit} noValidate>
            {sent && <p className="success">Thank you! Your message was sent 💌</p>}

            <label>
              Name
              <input name="name" value={form.name} onChange={update} />
              {errors.name && <span className="error">{errors.name}</span>}
            </label>

            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={update} />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>

            <label>
              Message
              <textarea name="message" rows="5" value={form.message} onChange={update} />
              {errors.message && <span className="error">{errors.message}</span>}
            </label>

            <button className="btn" type="submit">Send message</button>
          </form>
        </div>
      </section>
    </div>
  );
}
