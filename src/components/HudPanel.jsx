import { useRef, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, Zap, Shield, Sword, ChevronRight } from "lucide-react";

export default function HudPanel() {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Molle per l'effetto 3D (TILT) ultra-fluido stile Apple TV
  const rx = useSpring(0, { stiffness: 100, damping: 20 });
  const ry = useSpring(0, { stiffness: 100, damping: 20 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    // Movimento 3D morbidissimo
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 15);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 15);
  };
  
  const onLeave = () => {
    setIsHovered(false);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="relative w-full max-w-[340px] sm:max-w-[380px]"
      data-testid="hero-premium-card"
    >
      {/* ================= BACKGROUND GLOW ================= */}
      <motion.div 
        className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-[#FFB800] via-[#FF3D00] to-[#9D00FF] opacity-30 blur-2xl"
        animate={{ 
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? 0.5 : 0.3 
        }}
        transition={{ duration: 0.4 }}
      />

      {/* ================= MAIN CARD GLASS ================= */}
      <div className="relative rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/[0.08] to-black/60 p-1 shadow-2xl backdrop-blur-2xl">
        
        {/* Bordo interno di rinforzo */}
        <div className="relative rounded-[1.75rem] border border-white/5 bg-[#05080F]/40 p-5 sm:p-6 overflow-hidden">
          
          {/* Effetto "Shine" che passa sopra la card */}
          <motion.div 
            className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ left: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          />

          {/* --- HEADER --- */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-[#FFB800]/30 bg-[#FFB800]/10 px-3 py-1 backdrop-blur-md">
              <Sparkles size={12} className="text-[#FFB800]" />
              <span className="hud-mono text-[9px] font-bold tracking-[0.25em] text-[#FFB800]">MYTHIC DROP</span>
            </div>
            <span className="hud-mono text-[10px] font-medium tracking-[0.1em] text-white/40">#001</span>
          </div>

          {/* --- ITEM SHOWCASE (Immagine Centrale) --- */}
          <div className="relative mb-6 flex h-40 w-full items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-inner sm:h-48">
            {/* Luce radiale dietro l'oggetto */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-[#FFB800] opacity-20 blur-xl" />
            </div>
            
            {/* L'Oggetto che fluttua */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 text-[#FFB800] drop-shadow-[0_0_25px_rgba(255,184,0,0.6)]"
            >
              <Crown size={80} strokeWidth={1.5} />
            </motion.div>

            {/* Particelle Fluttuanti */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white"
                animate={{
                  y: [-20, -60],
                  x: Math.random() * 40 - 20,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "linear"
                }}
                style={{
                  left: `${40 + i * 10}%`,
                  bottom: "30%",
                  boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.5)"
                }}
              />
            ))}
          </div>

          {/* --- TITLE & SUBTITLE --- */}
          <div className="mb-6 text-center">
            <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white sm:text-3xl drop-shadow-md">
              ASTRAL CROWN
            </h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFB800]">
              [ Legendary Headpiece ]
            </p>
          </div>

          {/* --- STATISTICHE PREDATORIE --- */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            {[
              { icon: Sword, label: "DMG", val: "99", color: "#FF3D00" },
              { icon: Shield, label: "DEF", val: "85", color: "#4FD1FF" },
              { icon: Zap, label: "AGI", val: "SS", color: "#FFB800" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-black/20 p-2 shadow-inner">
                <stat.icon size={14} style={{ color: stat.color }} className="mb-1 opacity-80" />
                <span className="font-display text-lg font-bold text-white leading-none">{stat.val}</span>
                <span className="hud-mono mt-1 text-[8px] font-bold tracking-widest text-slate-500">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* --- CTA BUTTON (Quello che ti fa venire voglia di comprare) --- */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FF8A00] py-3.5 shadow-[0_0_20px_rgba(255,184,0,0.3)] transition-all hover:shadow-[0_0_30px_rgba(255,184,0,0.5)]"
          >
            {/* Effetto Shine interno al bottone */}
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
              <div className="relative h-full w-8 bg-white/30" />
            </div>
            
            <span className="font-display text-sm font-black uppercase tracking-widest text-black sm:text-base">
              EQUIP NOW
            </span>
            <ChevronRight size={18} className="text-black transition-transform group-hover:translate-x-1" />
          </motion.button>

        </div>
      </div>
    </motion.div>
  );
}
