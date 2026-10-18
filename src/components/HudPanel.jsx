import { useRef, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, Users, Star, Gamepad2, ChevronRight, X, Send, Trash2, ShieldAlert } from "lucide-react";

// Dati iniziali finti per far vedere che sei già un boss
const INITIAL_REVIEWS = [
  { id: 1, name: "NeonRider Studio", rating: 5, text: "Andy is a beast. Our game's retention doubled after his UI overhaul. Worth every Robux." },
  { id: 2, name: "Pixel_Queen", rating: 5, text: "Fast, clean, and extremely professional. The animations are so buttery smooth!" }
];

export default function HudPanel() {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // STATI DEL SISTEMA RECENSIONI
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [isAdmin, setIsAdmin] = useState(false); // IL SEGRETO
  
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

  // AGGIUNGI RECENSIONE
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    
    const review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      text: newReview.text
    };
    
    setReviews([review, ...reviews]); // Aggiunge in cima
    setNewReview({ name: "", text: "", rating: 5 }); // Resetta form
  };

  // ELIMINA RECENSIONE (Solo in Admin Mode)
  const handleDelete = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <>
      {/* ================= MODALE RECENSIONI (HALL OF FAME) ================= */}
      <AnimatePresence>
        {showReviews && (
          <motion.div
            className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* Sfondo scuro blurrato globale */}
            <div className="absolute inset-0 bg-[#05080F]/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            <motion.div 
              className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-[#FFB800]/20 bg-[#0A0F1A]/90 shadow-[0_0_50px_rgba(0,0,0,0.8)] md:flex-row h-[80vh] md:h-[600px]"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Bottone Chiudi Assoluto */}
              <button onClick={() => setShowReviews(false)} className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-slate-400 transition-colors hover:bg-red-500/20 hover:text-red-500 backdrop-blur-md">
                <X size={20} />
              </button>

              {/* LATO SINISTRO: Scrivi una recensione */}
              <div className="flex w-full flex-col border-b border-white/10 bg-black/40 p-6 md:w-1/2 md:border-b-0 md:border-r md:p-8">
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-black uppercase text-white drop-shadow-md">LEAVE A <span className="text-[#FFB800]">REVIEW</span></h3>
                  <p className="hud-mono text-[10px] tracking-[0.2em] text-slate-400">RATE MY UI DESIGN SERVICES</p>
                </div>

                <form onSubmit={handleSubmitReview} className="flex flex-1 flex-col gap-4">
                  {/* Selettore Stelle */}
                  <div className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-white/5 py-4">
                    <span className="hud-mono mb-2 text-[10px] uppercase tracking-widest text-slate-400">RATING</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverStar(star)}
                          onMouseLeave={() => setHoverStar(0)}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="transition-transform hover:scale-125"
                        >
                          <Star 
                            size={28} 
                            className={`transition-colors duration-200 ${(hoverStar || newReview.rating) >= star ? "fill-[#FFB800] text-[#FFB800] drop-shadow-[0_0_10px_rgba(255,184,0,0.5)]" : "fill-transparent text-slate-600"}`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Nome */}
                  <input type="text" required value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} placeholder="Your Name or Studio" maxLength={20} className="w-full rounded-xl border border-white/10 bg-black/40 py-3 px-4 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-[#FFB800] focus:bg-white/5 focus:shadow-[0_0_15px_rgba(255,184,0,0.1)]" />
                  
                  {/* Testo Recensione */}
                  <textarea required value={newReview.text} onChange={(e) => setNewReview({ ...newReview, text: e.target.value })} placeholder="How was the UI?" maxLength={150} rows={3} className="w-full resize-none rounded-xl border border-white/10 bg-black/40 py-3 px-4 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-[#FFB800] focus:bg-white/5 focus:shadow-[0_0_15px_rgba(255,184,0,0.1)]" />

                  {/* Submit Button */}
                  <button type="submit" className="group relative mt-auto flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#FFB800] py-3.5 shadow-[0_0_20px_rgba(255,184,0,0.3)] transition-all hover:shadow-[0_0_35px_rgba(255,184,0,0.5)]">
                    <span className="font-display text-sm font-black uppercase tracking-widest text-black">SUBMIT REVIEW</span>
                    <Send size={16} className="text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </form>
              </div>

              {/* LATO DESTRO: Lista Recensioni */}
              <div className="flex w-full flex-col bg-transparent md:w-1/2 overflow-hidden relative">
                {/* Glow decorativo */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FFB800] opacity-10 blur-[80px]" />
                
                <div className="border-b border-white/10 p-6 md:p-8 pb-4">
                  <h3 className="font-display text-xl font-bold uppercase text-white flex items-center gap-2">
                    <Star size={18} className="text-[#FFB800] fill-[#FFB800]" /> HALL OF FAME
                    {isAdmin && <span className="ml-auto flex items-center gap-1 rounded bg-red-500/20 px-2 py-1 text-[9px] font-bold text-red-500"><ShieldAlert size={10}/> ADMIN MODE</span>}
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-0 space-y-4 relative z-10 custom-scrollbar">
                  {reviews.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-slate-500 opacity-50">
                      <Star size={40} className="mb-2" />
                      <p className="font-mono text-xs tracking-widest">NO REVIEWS YET</p>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {reviews.map((rev) => (
                        <motion.div 
                          key={rev.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="group relative rounded-xl border border-white/5 bg-white/5 p-4 shadow-sm backdrop-blur-sm"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-display text-sm font-bold text-white">{rev.name}</span>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className={i < rev.rating ? "fill-[#FFB800] text-[#FFB800]" : "fill-transparent text-slate-600"} />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed text-slate-300">"{rev.text}"</p>
                          
                          {/* CESTINO (Visibile solo in Admin Mode) */}
                          {isAdmin && (
                            <button 
                              onClick={() => handleDelete(rev.id)}
                              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 shadow-lg transition-all hover:bg-red-600 group-hover:opacity-100"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
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
              
              {/* LA BACKDOOR SEGRETA: DOPPIO CLICK PER DIVENTARE ADMIN E CANCELLARE LE RECENSIONI */}
              <span 
                onDoubleClick={() => setIsAdmin(!isAdmin)}
                className="hud-mono cursor-pointer text-[11px] font-medium tracking-[0.1em] text-white/40 transition-colors hover:text-white/80"
                title="Double click me..."
              >
                STATUS: {isAdmin ? <span className="text-red-500 font-bold">ADMIN</span> : "OPEN"}
              </span>
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
