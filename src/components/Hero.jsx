import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Send, Sparkles } from "lucide-react";
import { scrollToId } from "../lib/scroll";
import { THEME_CONFIG } from "../theme";
import HudPanel from "./HudPanel";

// Easing ancora più fluido e snappy (stile Apple/Vercel)
const ease = [0.19, 1, 0.22, 1];

const MaskLine = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "115%", rotate: 2, opacity: 0 }}
      animate={{ y: "0%", rotate: 0, opacity: 1 }}
      transition={{ duration: 1.1, delay, ease }}
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // Parallax effects
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { brand } = THEME_CONFIG;

  return (
    <section ref={ref} id="hero" className="relative overflow-hidden bg-[#05080F]" data-testid="hero-section">
      
      {/* Background Grid & Vignette */}
      <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#05080F_100%)] pointer-events-none" />

      {/* Parallax Glowing Orbs */}
      <motion.div className="orb orb-primary opacity-70 blur-[120px]" style={{ y: orbY }} aria-hidden="true" />
      <motion.div className="orb orb-secondary opacity-50 blur-[100px] scale-150" style={{ y: orbY }} aria-hidden="true" />

      {/* Main Content Wrapper */}
      <motion.div 
        className="wrap relative z-10 grid min-h-[100svh] items-center gap-12 pb-10 pt-28 sm:gap-16 sm:pb-14 sm:pt-32 lg:min-h-screen lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 lg:pt-24"
        style={{ y: textY, opacity: opacityFade }}
      >
        
        {/* Left Column: Typography & CTA */}
        <div className="relative">
          
          {/* Tech Status Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mb-6 flex items-center gap-3 sm:mb-8"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-2 pr-4 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </span>
              <span className="hud-mono text-[10px] font-bold tracking-[0.2em] text-slate-300">
                AVAILABLE FOR WORK
              </span>
            </div>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="eyebrow mb-4 inline-flex items-center gap-2 text-primary sm:mb-6"
          >
            <Sparkles size={14} className="text-primary" />
            // ROBLOX UI DESIGNER
          </motion.div>

          {/* Massive Name Title */}
          <h1 
            className="font-display font-black leading-[0.88] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 drop-shadow-2xl" 
            style={{ fontSize: "clamp(3.5rem, 16vw, 12rem)" }}
          >
            <MaskLine delay={0.3}>{brand.name.toUpperCase()}</MaskLine>
          </h1>

          {/* Subtitle */}
          <h2 
            className="font-display mt-5 font-bold uppercase sm:mt-6 flex flex-col gap-1" 
            style={{ fontSize: "clamp(1.1rem, 3vw, 2.2rem)", letterSpacing: "0.02em" }}
          >
            <MaskLine delay={0.45} className="text-slate-300">
              Roblox UI Designer
            </MaskLine>
            <MaskLine delay={0.55}>
              <span className="text-white/40 font-light">[</span>
              <span className="text-grad mx-2">&amp; Interface Specialist</span>
              <span className="text-white/40 font-light">]</span>
            </MaskLine>
          </h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="mt-6 max-w-lg text-sm leading-relaxed text-slate-400 sm:mt-8 sm:text-base border-l-2 border-white/10 pl-4"
          >
            {brand.tagline}
          </motion.p>

          {/* CTA Buttons (Staggered Entry) */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-gradient relative group overflow-hidden" 
              onClick={() => scrollToId("showcase")} 
              data-testid="hero-cta-showcase"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative flex items-center gap-2">
                My Showcase <ArrowDown size={16} className="animate-bounce" />
              </span>
            </motion.button>
            
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-glass" 
              onClick={() => scrollToId("contact")} 
              data-testid="hero-cta-contact"
            >
              Get in Touch <Send size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>
          </div>
        </div>

        {/* Right Column: Holographic Floating HUD */}
        <motion.div
          className="relative z-10 mx-auto flex w-full justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease }}
        >
          {/* Questo motion.div fa "galleggiare" il pannello costantemente! */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-3xl opacity-30 animate-pulse" />
            <HudPanel />
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Tech Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 sm:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="hud-mono text-[9px] font-bold tracking-[0.4em] text-slate-400">INITIATE SCROLL</span>
          <div className="h-10 w-px bg-white/10 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent" 
              animate={{ y: ["-100%", "200%"] }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} 
            />
          </div>
        </div>
      </motion.div>

    </section>
  );
}
