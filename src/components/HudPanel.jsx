import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, Users, Star, Gamepad2, ChevronRight, X, Send, CheckCircle2, Loader2 } from "lucide-react";

// ============================================================================
// DATABASE FAKE (Le recensioni perfette e intoccabili)
// Media calcolata visivamente: 4.3
// ============================================================================
const FAKE_REVIEWS = [
  { id: 1, name: "Eric", rating: 5, text: "Very good, i'm very happy of his work. Delivered on time." },
  { id: 2, name: "Martin", rating: 4, text: "Fast and reliable. The UI looks clean and modern." },
  { id: 3, name: "d2ADG", rating: 5, text: "Incredible attention to detail. Definitely buying again." },
  { id: 4, name: "Gohit", rating: 4, text: "Solid design, exactly what we asked for our simulator." },
  { id: 5, name: "Good", rating: 3, text: "Good design, maybe took a bit longer but result is nice." },
  { id: 6, name: "Lolo", rating: 4, text: "Very good communication. Fast." },
  { id: 7, name: "Light", rating: 5, text: "Masterpiece. The glassmorphism effects are insane." },
  { id: 8, name: "Hi", rating: 4, text: "Fast delivery." },
];

export default function HudPanel() {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false); // Serve per il Portal
  
  // MODALE RECENSIONI
  const [showReviews, setShowReviews] = useState(false);
  
  // STATO FAKE SUBMIT (idle -> loading -> sent)
  const [submitState, setSubmitState] = useState("idle");
  const [fakeRating, setFakeRating] = useState(5);
  const [hoverStar, setHoverStar] = useState(0);

  // Molle 3D per l'effetto TILT
  const rx = useSpring(0, { stiffness: 100, damping: 20 });
  const ry = useSpring(0, { stiffness: 100, damping: 20 });

  // Assicura che il Portal parta solo lato client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Blocca lo scroll del sito quando la modale è aperta
  useEffect(() => {
    if (showReviews) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showReviews]);

  const onMove = (e) => {
    if (showReviews) return; 
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  
  const onLeave = () => {
    setIsHovered(false);
    rx.set(0);
    ry.set(0);
  };

  // ==========================================
  // LA MAGIA: IL FAKE SUBMIT
  // ==========================================
  const handleFakeSubmit = (e) => {
    e.preventDefault();
    if (submitState !== "idle") return;
    
    setSubmitState("loading");
    
    // Finge di caricare per 1.2 secondi, poi dice SENT!
    setTimeout(() => {
      setSubmitState("sent");
      
      // Dopo 3 secondi, torna alla normalità pulendo il form (illusione perfetta)
      setTimeout(() => {
        setSubmitState("idle");
        e.target.reset(); // Svuota il form
        setFakeRating(5);
      }, 3000);
    }, 1200);
  };

  // ==========================================
  // LA MODALE GIGANTE (Renderizzata nel Portal)
  // ==========================================
  const modalPortal = (
    <AnimatePresence>
      {showReviews && (
        <motion.div
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {/* Sfondo scuro blurrato */}
          <div className="absolute inset-0 bg-[#05080F]/90 backdrop-blur-xl" onClick={() => setShowReviews(false)} />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />

          {/* CONTENITORE ENORME (max-w-[1400px]) CHE ORA PRENDERÁ TUTTO LO SCHERMO! */}
          <motion.div 
            className="relative z-10 flex w-[95vw] max-w-[1400px] flex-col overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-[#FFB800]/20 bg-[#0A0F1A]/95 shadow-[0_0_80px_rgba(0,0,0,0.8)] h-[90vh] lg:h-[85vh]"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Bottone Chiudi Assoluto */}
            <button 
              onClick={() => setShowReviews(false)} 
              className="absolute right-4 top-4 z-[9999] rounded-full bg-black/80 p-2 sm:p-3 text-slate-300 transition-all hover:scale-110 hover:bg-red-500 hover:text-white backdrop-blur-md border border-white/10"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col lg:flex-row h-full w-full overflow-y-auto lg:overflow-hidden">
              
              {/* LATO SINISTRO: Form Fake (Larghezza fissa su PC) */}
              <div className="w-full lg:w-[450px] xl:w-[500px] shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 bg-black/40 p-6 sm:p-8 lg:p-12 lg:overflow-y-auto">
                <div className="mb-6 sm:mb-8 pr-12">
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white drop-shadow-md">LEAVE A <span className="text-[#FFB800]">REVIEW</span></h3>
                  <p className="hud-mono mt-2 text-[10px] sm:text-xs tracking-[0.2em] text-slate-400">RATE MY UI DESIGN SERVICES</p>
                </div>

                <div className="relative flex flex-1 flex-col">
                  {/* Overlay Successo / Caricamento */}
                  <AnimatePresence>
                    {submitState !== "idle" && (
                      <motion.div 
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-black/60"
                      >
                        {submitState === "loading" ? (
                          <Loader2 size={50} className="text-[#FFB800] animate-spin mb-4" />
                        ) : (
                          <motion.div 
                            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
                            className="flex flex-col items-center text-[#00E676]"
                          >
                            <CheckCircle2 size={70} className="mb-4 drop-shadow-[0_0_15px_rgba(0,230,118,0.5)]" />
                            <span className="font-display text-3xl font-black uppercase tracking-widest">SENT!</span>
                            <span className="font-mono text-sm text-white/50 mt-2">Thank you for your feedback.</span>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Il Form Fake */}
                  <form onSubmit={handleFakeSubmit} className="flex flex-col gap-4 sm:gap-6 h-full">
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 py-6 sm:py-8">
                      <span className="hud-mono mb-3 text-[11px] sm:text-[12px] uppercase tracking-widest text-slate-400">SELECT RATING</span>
                      <div className="flex gap-2 sm:gap-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverStar(star)}
                            onMouseLeave={() => setHoverStar(0)}
                            onClick={() => setFakeRating(star)}
                            className="transition-transform hover:scale-125 focus:outline-none"
                          >
                            <Star size={36} className={`transition-colors duration-200 sm:w-10 sm:h-10 ${(hoverStar || fakeRating) >= star ? "fill-[#FFB800] text-[#FFB800] drop-shadow-[0_0_15px_rgba(255,184,0,0.6)]" : "fill-transparent text-slate-600"}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <input type="text" required placeholder="Your Name or Studio" maxLength={30} className="w-full rounded-2xl border border-white/10 bg-black/40 py-4 sm:py-5 px-5 sm:px-6 text-base sm:text-lg text-white placeholder-slate-500 outline-none transition-all focus:border-[#FFB800] focus:bg-white/5" />
                    <textarea required placeholder="Describe your experience..." maxLength={250} rows={5} className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 py-4 sm:py-5 px-5 sm:px-6 text-base sm:text-lg text-white placeholder-slate-500 outline-none transition-all focus:border-[#FFB800] focus:bg-white/5" />

                    <button type="submit" className="group relative mt-4 sm:mt-auto flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#FFB800] py-4 sm:py-5 shadow-[0_0_25px_rgba(255,184,0,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,184,0,0.5)]">
                      <span className="font-display text-lg sm:text-xl font-black uppercase tracking-widest text-black">SUBMIT REVIEW</span>
                      <Send size={20} className="text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </form>
                </div>
              </div>

              {/* LATO DESTRO: Le finte recensioni dorate che usano TUTTO lo spazio */}
              <div className="flex-1 flex flex-col relative min-h-[500px] lg:min-h-0 lg:overflow-hidden">
                <div className="absolute -right-32 -top-32 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full bg-[#FFB800] opacity-10 blur-[100px] pointer-events-none" />
                
                <div className="border-b border-white/10 p-6 sm:p-8 lg:p-12 pb-6 relative z-10 flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white flex items-center gap-4">
                      <Star size={36} className="text-[#FFB800] fill-[#FFB800] drop-shadow-[0_0_15px_rgba(255,184,0,0.5)]" /> 
                      HALL OF FAME
                    </h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-display text-5xl sm:text-6xl font-black text-[#FFB800] drop-shadow-md">4.3</span>
                    <span className="hud-mono text-[10px] sm:text-xs tracking-widest text-slate-400">AVERAGE</span>
                  </div>
                </div>

                <div className="flex-1 lg:overflow-y-auto p-6 sm:p-8 lg:p-12 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 custom-scrollbar content-start">
                  {FAKE_REVIEWS.map((rev) => (
                    <motion.div 
                      key={rev.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group relative rounded-2xl border border-white/5 bg-white/[0.03] p-6 sm:p-8 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/[0.06] h-max"
                    >
                      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="font-display text-xl sm:text-2xl font-bold text-white">{rev.name}</span>
                        <div className="flex gap-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className={i < rev.rating ? "fill-[#FFB800] text-[#FFB800]" : "fill-transparent text-slate-600"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-base sm:text-lg leading-relaxed text-slate-300">"{rev.text}"</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* MAGIA DEL PORTAL: Renderizza la modale nel Body, fuori dalla prigione dell'animazione! */}
      {mounted && typeof document !== "undefined" && createPortal(modalPortal, document.body)}

      {/* ================= LA CARD PRINCIPALE GIGANTE ================= */}
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        // MAX-W MAGGIORATO PER ESSERE MASSICCIO SU PC!
        className="relative w-full max-w-[380px] sm:max-w-[460px] lg:max-w-[520px] mx-auto lg:mx-0"
        data-testid="hero-premium-card"
      >
        <motion.div 
          className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-[#FFB800] via-[#FF3D00] to-[#9D00FF] opacity-30 blur-3xl"
          animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered ? 0.6 : 0.3, rotate: isHovered ? 2 : 0 }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/[0.08] to-black/60 p-1.5 shadow-2xl backdrop-blur-2xl h-full flex flex-col justify-between">
          <div className="relative rounded-[1.75rem] border border-white/5 bg-[#05080F]/60 p-6 sm:p-8 lg:p-10 overflow-hidden h-full flex flex-col">
            
            <motion.div 
              className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ left: ["-100%", "200%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
            />

            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-full border border-[#FFB800]/40 bg-[#FFB800]/15 px-4 py-2 backdrop-blur-md">
                <Sparkles size={16} className="text-[#FFB800] animate-pulse" />
                <span className="hud-mono text-[11px] sm:text-[12px] font-bold tracking-[0.25em] text-[#FFB800]">ELITE DESIGNER</span>
              </div>
              <span className="hud-mono text-[12px] font-medium tracking-[0.1em] text-white/40">STATUS: OPEN</span>
            </div>

            {/* IMMAGINE CENTRALE */}
            <div className="relative mb-8 flex h-52 sm:h-64 lg:h-72 w-full items-center justify-center rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-inner flex-1">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-40 rounded-full bg-[#FFB800] opacity-25 blur-[40px]" />
              </div>
              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 text-[#FFB800] drop-shadow-[0_0_40px_rgba(255,184,0,0.8)]">
                <Crown size={110} strokeWidth={1.5} className="sm:w-32 sm:h-32" />
              </motion.div>
              {[...Array(6)].map((_, i) => (
                <motion.div key={i} className="absolute h-2 w-2 rounded-full bg-white" animate={{ y: [-20, -100], x: Math.random() * 80 - 40, opacity: [0, 1, 0], scale: [0, 1.5, 0] }} transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: i * 0.4, ease: "linear" }} style={{ left: `${20 + i * 12}%`, bottom: "20%", boxShadow: "0 0 15px 4px rgba(255, 184, 0, 0.6)" }} />
              ))}
            </div>

            {/* TITOLI */}
            <div className="mb-8 text-center shrink-0">
              <h3 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-lg">UI/UX MASTERY</h3>
              <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.3em] text-[#FFB800]">[ The Gold Standard ]</p>
            </div>

            {/* STATISTICHE */}
            <div className="mb-8 grid grid-cols-3 gap-4 shrink-0">
              {[ { icon: Users, label: "CLIENTS", val: "30+", color: "#4FD1FF" }, { icon: Star, label: "RATING", val: "4.3", color: "#FFB800" }, { icon: Gamepad2, label: "PLAYS", val: "50M+", color: "#00E676" } ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-black/30 p-3 sm:p-4 shadow-inner">
                  <stat.icon size={18} style={{ color: stat.color }} className="mb-2 opacity-90 drop-shadow-[0_0_5px_currentColor]" />
                  <span className="font-display text-2xl sm:text-3xl font-bold text-white leading-none">{stat.val}</span>
                  <span className="hud-mono mt-2 text-[10px] font-bold tracking-widest text-slate-400">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* BOTTONE GIGANTE CTA */}
            <motion.button
              onClick={() => setShowReviews(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#FFB800] to-[#FF8A00] py-5 shadow-[0_0_30px_rgba(255,184,0,0.3)] transition-all hover:shadow-[0_0_50px_rgba(255,184,0,0.5)] shrink-0"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                <div className="relative h-full w-12 bg-white/30" />
              </div>
              <span className="font-display text-lg sm:text-xl font-black uppercase tracking-widest text-black">CLIENT REVIEWS</span>
              <ChevronRight size={24} className="text-black transition-transform group-hover:translate-x-1" />
            </motion.button>

          </div>
        </div>
      </motion.div>
    </>
  );
}
