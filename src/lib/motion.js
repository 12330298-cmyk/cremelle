// Shared animation setup: GSAP + ScrollTrigger + Lenis (smooth scroll)
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;
export const getLenis = () => lenis;

/**
 * Starts Lenis smooth scrolling and connects it to GSAP's ticker,
 * so ScrollTrigger animations stay in sync with the smooth scroll.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
    };
  }, []);
}

/**
 * Scroll animations driven by data attributes (so pages stay clean):
 *   data-reveal           -> element fades/slides up when it enters the screen
 *   data-reveal-group     -> its children appear one after another (stagger)
 *   data-parallax="60"    -> element drifts up by 60px while scrolling
 */
export function useScrollAnimations(scopeRef, deps = []) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
        gsap.from(group.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax) || 60;
        gsap.fromTo(
          el,
          { y: amount },
          {
            y: -amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // make sure positions are measured after the page has rendered
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: scopeRef, dependencies: deps, revertOnUpdate: true }
  );
}

export { gsap, ScrollTrigger, useGSAP };
