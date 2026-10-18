import { useRef, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, Users, Star, Gamepad2, ChevronRight, X, Send } from "lucide-react";

// ============================================================================
// IL TUO DATABASE PERSONALE (SOLO TU DA GITHUB PUOI MODIFICARE/ELIMINARE QUESTE)
// ============================================================================
const INITIAL_REVIEWS = [
  { id: 1, name: "NeonRider Studio", rating: 5, text: "Andy is a beast. Our game's retention doubled after his UI overhaul. Worth every Robux." },
  { id: 2, name: "Pixel_Queen", rating: 5, text: "Fast, clean, and extremely professional. The animations are so buttery smooth!" },
  { id: 3, name: "AdoptPets_Dev", rating: 5, text: "The mythic drop card he made for our shop increased our sales by 300%. Absolute legend." }
];

// ============================================================================
// FILTRO ANTI-TROLL (Aggiungi qui tutte le parole che vuoi censurare)
// ============================================================================
const BAD_WORDS = [
  "fuck", "shit", "bitch", "asshole", "cunt", "dick", "pussy", // EN
  "cazzo", "merda", "puttana", "troia", "stronzo", "frocio", "coglion", // IT
  "puta", "mierda", "cabron", "pendejo", "gilipollas", // ES
  "kurwa", "blyat", "cyka" // Altre
];

// Funzione che censura le parole volgari sostituendole con ***
const censorText = (text) => {
  let censored = text;
  BAD_WORDS.forEach((word) => {
    // Il regex cerca la parola esatta, ignorando maiuscole/minuscole
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    censored = censored.replace(regex, "***");
  });
  return censored;
};

export default function HudPanel() {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // STATI DEL SISTEMA RECENSIONI
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  
  // STATI DEL FORM
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 5 });
  const [hoverStar, setHoverStar] = useState(0);

  // Molle per l'effetto 3D (TILT) ultra-fluido
  const rx = useSpring(0, { stiffness: 100, damping: 20 });
  const ry = useSpring(0, { stiffness: 100, damping: 20 });

  const onMove = (e) => {
    if (showReviews) return; // Blocca il tilt se la modale è aperta
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

  // AGGIUNGI RECENSIONE CON CENSURA
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    
    // Applica il filtro anti-troll prima di salvare!
    const safeName = censorText(newReview.name);
    const safeText = censorText(newReview.text);

    const review = {
      id: Date.now(),
      name: safeName,
      rating: newReview.rating,
      text: safeText
    };
    
    setReviews([review, ...reviews]); // Aggiunge in cima (spariscono se ricarica la pagina)
    setNewReview({ name: "", text: "", rating: 5 }); // Resetta form
  };

  return (
    <>
      {/* ================= MODALE RECENSIONI GIGANTE (HALL OF FAME) ================= */}
      <AnimatePresence>
        {showReviews && (
          <motion.div
            className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* Sfondo scuro blurrato globale */}
            <div className="absolute inset-0 bg-[#05080F]/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            {/* CONTENITORE GIGANTE AUTOSCALANTE (w-[95vw] max-w-7xl h-[90vh]) */}
            <motion.div 
              className="relative z-10 flex w-[95vw] max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-[#FFB800]/20 bg-[#0A0F1A]/90 shadow-[0_0_80px_rgba(0,0,0,0.8)] md:flex-row h-[90vh] max-h-[900px]"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Bottone Chiudi Assoluto */}
              <button onClick={() => setShowReviews(false)} className="absolute right-6 top-6 z-50 rounded-full bg-black/50 p-3 text-slate-400 transition-all hover:scale-110 hover:bg-red-500/20 hover:text-red-500 backdrop-blur-md border border-white/10">
                <X size={24} />
              </button>

              {/* LATO SINISTRO: Scrivi una recensione */}
              <div className="flex w-full flex-col border-b border-white/10 bg-black/40 p-8 md:w-[45%] lg:w-[40%] md:border-b-0 md:border-r md:p-10 lg:p-12">
                <div className="mb-8">
                  <h3 className="font-display text-3xl font-black uppercase text-white drop-shadow-md sm:text-4xl">LEAVE A <span className="text-[#FFB800]">REVIEW</span></h3>
                  <p className="hud-mono mt-2 text-xs tracking-[0.2em] text-slate-400">RATE MY UI DESIGN SERVICES</p>
                </div>

                <form onSubmit={handleSubmitReview} className="flex flex-1 flex-col gap-5 lg:gap-6">
                  {/* Selettore Stelle */}
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 py-6">
                    <span className="hud-mono mb-3 text-[11px] uppercase tracking-widest text-slate-400">SELECT RATING</span>
                    <div className="flex gap-2 sm:gap-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverStar(star)}
                          onMouseLeave={() => setHoverStar(0)}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="transition-transform hover:scale-125 focus:outline-none"
                        >
                          <Star 
                            size={36} 
                            className={`transition-colors duration-200 ${(hoverStar || newReview.rating) >= star ? "fill-[#FFB800] text-[#FFB800] drop-shadow-[0_0_15px_rgba(255,184,0,0.6)]" : "fill-transparent text-slate-600"}`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Nome */}
                  <input type="text" required value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} placeholder="Your Name or Studio" maxLength={30} className="w-full rounded-2xl border border-white/10 bg-black/40 py-4 px-5 text-base text-white placeholder-slate-500 outline-none transition-all focus:border-[#FFB800] focus:bg-white/5 focus:shadow-[0_0_20px_rgba(255,184,0,0.15)]" />
                  
                  {/* Testo Recensione */}
                  <textarea required value={newReview.text} onChange={(e) => setNewReview({ ...newReview, text: e.target.value })} placeholder="Describe your experience..." maxLength={250} rows={5} className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 py-4 px-5 text-base text-white placeholder-slate-500 outline-none transition-all focus:border-[#FFB800] focus:bg-white/5 focus:shadow-[0_0_20px_rgba(255,184,0,0.15)]" />

                  {/* Submit Button */}
                  <button type="submit" className="group relative mt-auto flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#FFB800] py-4 shadow-[0_0_25px_rgba(255,184,0,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,184,0,0.5)]">
                    <span className="font-display text-lg font-black uppercase tracking-widest text-black">SUBMIT REVIEW</span>
                    <Send size={20} className="text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </form>
              </div>

              {/* LATO DESTRO: Lista Recensioni */}
              <div className="flex w-full flex-col bg-transparent md:w-[55%] lg:w-[60%] overflow-hidden relative">
                {/* Glow decorativo Gigante */}
                <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#FFB800] opacity-10 blur-[120px] pointer-events-none" />
                
                <div className="border-b border-white/10 p-8 lg:p-10 pb-6 relative z-10">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white flex items-center gap-3">
                    <Star size={28} className="text-[#FFB800] fill-[#FFB800] drop-shadow-[0_0_10px_rgba(255,184,0,0.5)]" /> 
                    HALL OF FAME
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto p-8 lg:p-10 pt-4 space-y-5 relative z-10 custom-scrollbar">
                  {reviews.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-slate-500 opacity-50">
                      <Star size={60} className="mb-4" />
                      <p className="font-mono text-sm tracking-widest">NO REVIEWS YET</p>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {reviews.map((rev) => (
                        <motion.div 
                          key={rev.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="group relative rounded-2xl border border-white/5 bg-white/[0.03] p-6 sm:p-8 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/[0.06]"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <span className="font-display text-lg sm:text-xl font-bold text-white">{rev.name}</span>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className={i < rev.rating ? "fill-[#FFB800] text-[#FFB800]" : "fill-transparent text-slate-600"} />
                              ))}
                            </div>
                          </div>
                          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">"{rev.text}"</p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              </div>
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
        className="relative w-full max-w-[380px] sm:max-w-[420px]"
        data-testid="hero-premium-card"
      >
        <motion.div 
          className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-[#FFB800] via-[#FF3D00] to-[#9D00FF] opacity-30 blur-2xl"
          animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered ? 0.6 : 0.3, rotate: isHovered ? 2 : 0 }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/[0.08] to-black/60 p-1.5 shadow-2xl backdrop-blur-2xl">
          <div className="relative rounded-[1.75rem] border border-white/5 bg-[#05080F]/60 p-6 sm:p-7 overflow-hidden">
            
            <motion.div 
              className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ left: ["-100%", "200%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
            />

            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-full border border-[#FFB800]/40 bg-[#FFB800]/15 px-3 py-1.5 backdrop-blur-md">
                <Sparkles size={14} className="text-[#FFB800] animate-pulse" />
                <span className="hud-mono text-[10px] font-bold tracking-[0.25em] text-[#FFB800]">ELITE DESIGNER</span>
              </div>
              <span className="hud-mono text-[11px] font-medium tracking-[0.1em] text-white/40">STATUS: OPEN</span>
            </div>

            <div className="relative mb-8 flex h-48 w-full items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-inner sm:h-56">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full bg-[#FFB800] opacity-25 blur-[30px]" />
              </div>
              <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 text-[#FFB800] drop-shadow-[0_0_30px_rgba(255,184,0,0.7)]">
                <Crown size={90} strokeWidth={1.5} />
              </motion.div>
              {[...Array(5)].map((_, i) => (
                <motion.div key={i} className="absolute h-1.5 w-1.5 rounded-full bg-white" animate={{ y: [-20, -80], x: Math.random() * 60 - 30, opacity: [0, 1, 0], scale: [0, 1.5, 0] }} transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: i * 0.5, ease: "linear" }} style={{ left: `${30 + i * 10}%`, bottom: "20%", boxShadow: "0 0 12px 3px rgba(255, 184, 0, 0.6)" }} />
              ))}
            </div>

            <div className="mb-8 text-center">
              <h3 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl drop-shadow-lg">UI/UX MASTERY</h3>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#FFB800]">[ The Gold Standard ]</p>
            </div>

            <div className="mb-8 grid grid-cols-3 gap-3 sm:gap-4">
              {[ { icon: Users, label: "CLIENTS", val: "30+", color: "#4FD1FF" }, { icon: Star, label: "RATING", val: "99%", color: "#FFB800" }, { icon: Gamepad2, label: "PLAYS", val: "50M+", color: "#00E676" } ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-black/30 p-2.5 sm:p-3 shadow-inner">
                  <stat.icon size={16} style={{ color: stat.color }} className="mb-1.5 opacity-90 drop-shadow-[0_0_5px_currentColor]" />
                  <span className="font-display text-xl font-bold text-white leading-none">{stat.val}</span>
                  <span className="hud-mono mt-1.5 text-[9px] font-bold tracking-widest text-slate-400">{stat.label}</span>
                </div>
              ))}
            </div>

            <motion.button
              onClick={() => setShowReviews(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FF8A00] py-4 shadow-[0_0_25px_rgba(255,184,0,0.3)] transition-all hover:shadow-[0_0_40px_rgba(255,184,0,0.5)]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                <div className="relative h-full w-10 bg-white/30" />
              </div>
              <span className="font-display text-base font-black uppercase tracking-widest text-black">CLIENT REVIEWS</span>
              <ChevronRight size={20} className="text-black transition-transform group-hover:translate-x-1" />
            </motion.button>

          </div>
        </div>
      </motion.div>
    </>
  );
}
