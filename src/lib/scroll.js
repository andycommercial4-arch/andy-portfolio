import Lenis from "lenis";

let lenis = null;

export const initLenis = () => {
  if (lenis) return lenis;
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  const raf = (t) => {
    lenis.raf(t);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
};

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const lockScroll = (lock) => {
  if (!lenis) return;
  if (lock) lenis.stop();
  else lenis.start();
};