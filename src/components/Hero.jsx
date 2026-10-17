import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Send } from "lucide-react";
import { scrollToId } from "../lib/scroll";
import { THEME_CONFIG } from "../theme";
import HudPanel from "./HudPanel";

const ease = [0.22, 1, 0.36, 1];

const MaskLine = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "112%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const { brand } = THEME_CONFIG;

  return (
    <section ref={ref} id="hero" className="relative overflow-hidden" data-testid="hero-section">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <motion.div className="orb orb-primary" style={{ y: orbY }} aria-hidden="true" />
      <motion.div className="orb orb-secondary" style={{ y: orbY }} aria-hidden="true" />

      <div className="wrap relative z-10 grid min-h-[100svh] items-center gap-8 pb-10 pt-24 sm:gap-12 sm:pb-14 sm:pt-28 lg:min-h-screen lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pt-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="eyebrow mb-5 inline-flex items-center gap-2 sm:mb-7"
          >
            <span className="pulse-dot" />
            // ROBLOX UI DESIGNER
          </motion.div>

          <h1 className="font-display font-black leading-[0.92] text-white" style={{ fontSize: "clamp(3.6rem, 18vw, 13rem)", letterSpacing: "-0.02em" }}>
            <MaskLine delay={0.25}>{brand.name.toUpperCase()}</MaskLine>
          </h1>

          <h2 className="font-display mt-4 font-bold uppercase sm:mt-6" style={{ fontSize: "clamp(1rem, 3.2vw, 2rem)", letterSpacing: "0.02em" }}>
            <MaskLine delay={0.45} className="text-white/90">Roblox UI Designer</MaskLine>
            <MaskLine delay={0.58}><span className="text-grad">&amp; Interface Specialist</span></MaskLine>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="mt-5 max-w-md text-sm leading-relaxed text-slate-400 sm:mt-7 sm:text-base"
          >
            {brand.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease }}
            className="mt-7 flex flex-wrap items-center gap-4 sm:mt-10"
          >
            <button className="btn btn-gradient" onClick={() => scrollToId("showcase")} data-testid="hero-cta-showcase">
              My Showcase <ArrowDown size={16} />
            </button>
            <button className="btn btn-glass" onClick={() => scrollToId("contact")} data-testid="hero-cta-contact">
              Get in Touch <Send size={15} />
            </button>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 mx-auto flex w-full justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease }}
        >
          <HudPanel />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="hud-mono text-[9px] tracking-[0.35em] text-slate-500">SCROLL</span>
          <motion.span className="block h-9 w-px" style={{ background: "linear-gradient(180deg, var(--c-primary), transparent)" }} animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </motion.div>
    </section>
  );
}