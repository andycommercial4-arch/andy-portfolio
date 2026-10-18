import { useRef, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, Users, Star, Gamepad2, ChevronRight, Check } from "lucide-react";

export default function HudPanel() {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  
  // Molle per l'effetto 3D (TILT) ultra-fluido
  const rx = useSpring(0, { stiffness: 100, damping: 20 });
  const ry = useSpring(0, { stiffness: 100, damping: 20 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 15);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 15);
  };
  
  const onLeave = () => {
    setIsHovered(false);
    rx.set(0);
    ry.set(0);
  };

  // L'ANIMAZIONE SUPER FIGA QUANDO PREMI IL BOTTONE
  const handleHireClick = () => {
    if (isClicked) return;
    setIsClicked(true);
    setShowOverlay(true);

    // Resetta l'effetto dopo 2.5 secondi
    setTimeout(() => {
      setShowOverlay(false);
      setIsClicked(false);
    }, 2500);
  };

  return (
    <>
      {/* ================= L'EFFETTO OLOGRAFICO A TUTTO SCHERMO (WOW FACTOR) ================= */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {/* Flash Iniziale */}
            <motion.div 
              className="absolute inset-0 bg-white"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            
            {/* Sfondo scuro blurrato */}
            <div className="absolute inset-0 bg-[#05080F]/90 backdrop-blur-md" />
            
            {/* Griglia Cyberpunk */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />

            {/* Laser Scanner che scende */}
            <motion.div
              className="absolute left-0 right-0 h-1 bg-[#FFB800] shadow-[0_0_30px_#FFB800]"
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 1.5, ease: "linear" }}
            />

            {/* Testo Olografico Centrale */}
            <motion.div 
              className="relative z-10 text-center"
              initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#FFB800] bg-[#FFB800]/20 shadow-[0_0_50px_rgba(255,184,0,0.5)]">
                  <Check size={40} className="text-[#FFB800]" />
                </div>
              </div>
              <h2 className="font-display text-4xl font-black uppercase tracking-widest text-white sm:text-6xl drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                UPLINK <span className="text-[#FFB800]">ESTABLISHED</span>
              </h2>
              <p className="hud-mono mt-4 text-sm font-bold tracking-[0.4em] text-slate-400 sm:text-base">
                PREPARE FOR ELITE UI DESIGN
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= LA CARD PRINCIPALE ================= */}
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        // Ingrandita per essere più imponente (max-w-[420px])
        className="relative w-full max-w-[380px] sm:max-w-[420px]"
        data-testid="hero-premium-card"
      >
        {/* Glow di Sfondo */}
        <motion.div 
          className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-[#FFB800] via-[#FF3D00] to-[#9D00FF] opacity-30 blur-2xl"
          animate={{ 
            scale: isHovered ? 1.05 : 1,
            opacity: isHovered ? 0.6 : 0.3,
            rotate: isHovered ? 2 : 0
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Vetro della Card */}
        <div className="relative rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/[0.08] to-black/60 p-1.5 shadow-2xl backdrop-blur-2xl">
          
          <div className="relative rounded-[1.75rem] border border-white/5 bg-[#05080F]/60 p-6 sm:p-7 overflow-hidden">
            
            {/* Effetto Shine Continuo */}
            <motion.div 
              className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ left: ["-100%", "200%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
            />

            {/* --- HEADER --- */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-full border border-[#FFB800]/40 bg-[#FFB800]/15 px-3 py-1.5 backdrop-blur-md">
                <Sparkles size={14} className="text-[#FFB800] animate-pulse" />
                <span className="hud-mono text-[10px] font-bold tracking-[0.25em] text-[#FFB800]">ELITE DESIGNER</span>
              </div>
              <span className="hud-mono text-[11px] font-medium tracking-[0.1em] text-white/40">STATUS: OPEN</span>
            </div>

            {/* --- IMMAGINE CENTRALE (Aumentata d'altezza) --- */}
            <div className="relative mb-8 flex h-48 w-full items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-inner sm:h-56">
              {/* Luce radiale */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full bg-[#FFB800] opacity-25 blur-[30px]" />
              </div>
              
              {/* Corona Fluttuante */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 text-[#FFB800] drop-shadow-[0_0_30px_rgba(255,184,0,0.7)]"
              >
                <Crown size={90} strokeWidth={1.5} />
              </motion.div>

              {/* Particelle Fluttuanti Scintillanti */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-white"
                  animate={{
                    y: [-20, -80],
                    x: Math.random() * 60 - 30,
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear"
                  }}
                  style={{
                    left: `${30 + i * 10}%`,
                    bottom: "20%",
                    boxShadow: "0 0 12px 3px rgba(255, 184, 0, 0.6)"
                  }}
                />
              ))}
            </div>

            {/* --- TITOLI --- */}
            <div className="mb-8 text-center">
              <h3 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl drop-shadow-lg">
                UI/UX MASTERY
              </h3>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#FFB800]">
                [ The Gold Standard ]
              </p>
            </div>

            {/* --- LE TUE STATISTICHE REALI --- */}
            <div className="mb-8 grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { icon: Users, label: "CLIENTS", val: "30+", color: "#4FD1FF" },
                { icon: Star, label: "RATING", val: "99%", color: "#FFB800" },
                { icon: Gamepad2, label: "PLAYS", val: "50M+", color: "#00E676" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-black/30 p-2.5 sm:p-3 shadow-inner">
                  <stat.icon size={16} style={{ color: stat.color }} className="mb-1.5 opacity-90 drop-shadow-[0_0_5px_currentColor]" />
                  <span className="font-display text-xl font-bold text-white leading-none">{stat.val}</span>
                  <span className="hud-mono mt-1.5 text-[9px] font-bold tracking-widest text-slate-400">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* --- BOTTONE CTA DINAMICO --- */}
            <motion.button
              onClick={handleHireClick}
              whileHover={!isClicked ? { scale: 1.03 } : {}}
              whileTap={!isClicked ? { scale: 0.97 } : {}}
              className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-4 transition-all duration-300 ${
                isClicked 
                  ? "bg-[#00E676] shadow-[0_0_30px_rgba(0,230,118,0.5)]" 
                  : "bg-gradient-to-r from-[#FFB800] to-[#FF8A00] shadow-[0_0_25px_rgba(255,184,0,0.3)] hover:shadow-[0_0_40px_rgba(255,184,0,0.5)]"
              }`}
            >
              {!isClicked && (
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-10 bg-white/30" />
                </div>
              )}
              
              {isClicked ? (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="flex items-center gap-2"
                >
                  <Check size={20} className="text-black" />
                  <span className="font-display text-base font-black uppercase tracking-widest text-black">
                    REQUEST SENT
                  </span>
                </motion.div>
              ) : (
                <>
                  <span className="font-display text-base font-black uppercase tracking-widest text-black">
                    HIRE ME NOW
                  </span>
                  <ChevronRight size={20} className="text-black transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>

          </div>
        </div>
      </motion.div>
    </>
  );
}
