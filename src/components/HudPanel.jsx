import { useRef, useState, useEffect } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, Users, Star, Gamepad2, ChevronRight, Check, X, User, MessageSquare, AtSign, Send } from "lucide-react";

export default function HudPanel() {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // STATI DEL FORM
  const [formState, setFormState] = useState("closed"); // "closed", "flash", "form", "transmitting"
  const [reqType, setReqType] = useState("HIRE"); // "HIRE" o "QUESTION"
  const [formData, setFormData] = useState({ name: "", discord: "", message: "" });

  // Molle per l'effetto 3D (TILT) ultra-fluido della card
  const rx = useSpring(0, { stiffness: 100, damping: 20 });
  const ry = useSpring(0, { stiffness: 100, damping: 20 });

  const onMove = (e) => {
    if (formState !== "closed") return; // Disabilita il tilt se il form è aperto
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

  // SEQUENZA DI APERTURA
  const handleHireClick = () => {
    if (formState !== "closed") return;
    setFormState("flash");
    setTimeout(() => {
      setFormState("form");
    }, 2000); // Dopo 2s di animazione flash, apre il form
  };

  // INVIO MESSAGGIO
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.discord || !formData.message) return;

    setFormState("transmitting");

    // Formatta l'email
    const subject = encodeURIComponent(`[${reqType === "HIRE" ? "Hire Request" : "Question"}] from ${formData.name}`);
    const body = encodeURIComponent(
      `CLIENT DETAILS:\n-----------------\nName: ${formData.name}\nDiscord: ${formData.discord}\n\nMESSAGE:\n-----------------\n${formData.message}`
    );

    // Simula trasmissione hacker e poi apre Mailto
    setTimeout(() => {
      window.location.href = `mailto:andycommercial4@gmail.com?subject=${subject}&body=${body}`;
      setFormState("closed");
      setFormData({ name: "", discord: "", message: "" });
    }, 2500);
  };

  return (
    <>
      {/* ================= TERMINALE OLOGRAFICO (FORM MODAL) ================= */}
      <AnimatePresence>
        {formState !== "closed" && (
          <motion.div
            className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {/* Sfondo scuro blurrato globale */}
            <div className="absolute inset-0 bg-[#05080F]/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            {/* --- FASE 1: FLASH INIZIALE --- */}
            {formState === "flash" && (
              <>
                <motion.div className="absolute inset-0 bg-white" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.5 }} />
                <motion.div className="absolute left-0 right-0 h-1 bg-[#FFB800] shadow-[0_0_30px_#FFB800]" initial={{ top: "-10%" }} animate={{ top: "110%" }} transition={{ duration: 1.5, ease: "linear" }} />
                <motion.div className="relative z-10 text-center" initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }} animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#FFB800] bg-[#FFB800]/20 shadow-[0_0_50px_rgba(255,184,0,0.5)]">
                      <Check size={40} className="text-[#FFB800]" />
                    </div>
                  </div>
                  <h2 className="font-display text-4xl font-black uppercase tracking-widest text-white sm:text-6xl drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                    UPLINK <span className="text-[#FFB800]">ESTABLISHED</span>
                  </h2>
                </motion.div>
              </>
            )}

            {/* --- FASE 2: IL FORM VERO E PROPRIO --- */}
            {formState === "form" && (
              <motion.div 
                className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0F1A]/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Glow decorativo interno */}
                <div className={`absolute -top-32 -left-32 h-64 w-64 rounded-full blur-[80px] opacity-30 transition-colors duration-500 ${reqType === "HIRE" ? "bg-[#FFB800]" : "bg-[#4FD1FF]"}`} />

                {/* Header Form */}
                <div className="flex items-center justify-between border-b border-white/10 p-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${reqType === "HIRE" ? "border-[#FFB800]/50 bg-[#FFB800]/20 text-[#FFB800]" : "border-[#4FD1FF]/50 bg-[#4FD1FF]/20 text-[#4FD1FF]"}`}>
                      <Send size={14} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white tracking-widest">SECURE_COMMS</h3>
                      <p className="hud-mono text-[9px] tracking-[0.2em] text-slate-400">ENCRYPTED CHANNEL TO ANDYDEV</p>
                    </div>
                  </div>
                  <button onClick={() => setFormState("closed")} className="rounded-full bg-white/5 p-2 text-slate-400 transition-colors hover:bg-red-500/20 hover:text-red-500">
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 relative z-10">
                  {/* Selettore HIRE / QUESTION */}
                  <div className="mb-6 flex rounded-xl border border-white/10 bg-black/40 p-1">
                    <button type="button" onClick={() => setReqType("HIRE")} className={`flex-1 rounded-lg py-2 transition-all duration-300 ${reqType === "HIRE" ? "bg-[#FFB800] text-black shadow-[0_0_15px_rgba(255,184,0,0.4)]" : "text-slate-400 hover:text-white"}`}>
                      <span className="font-display text-sm font-bold uppercase tracking-widest">HIRE REQUEST</span>
                    </button>
                    <button type="button" onClick={() => setReqType("QUESTION")} className={`flex-1 rounded-lg py-2 transition-all duration-300 ${reqType === "QUESTION" ? "bg-[#4FD1FF] text-black shadow-[0_0_15px_rgba(79,209,255,0.4)]" : "text-slate-400 hover:text-white"}`}>
                      <span className="font-display text-sm font-bold uppercase tracking-widest">QUESTION</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Campo Nome */}
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <User size={16} className="text-slate-500" />
                      </div>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your Name / Studio" className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-[#FFB800] focus:bg-white/5 focus:shadow-[0_0_15px_rgba(255,184,0,0.1)]" />
                    </div>

                    {/* Campo Discord (OBBLIGATORIO) */}
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <AtSign size={16} className="text-[#5865F2]" />
                      </div>
                      <input type="text" required value={formData.discord} onChange={(e) => setFormData({ ...formData, discord: e.target.value })} placeholder="Discord Username (Required)" className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-[#5865F2] focus:bg-white/5 focus:shadow-[0_0_15px_rgba(88,101,242,0.2)]" />
                    </div>

                    {/* Campo Messaggio */}
                    <div className="relative">
                      <div className="pointer-events-none absolute top-3 left-0 flex items-center pl-4">
                        <MessageSquare size={16} className="text-slate-500" />
                      </div>
                      <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Describe your project or ask a question..." rows={4} className="w-full resize-none rounded-xl border border-white/10 bg-black/40 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-[#FFB800] focus:bg-white/5 focus:shadow-[0_0_15px_rgba(255,184,0,0.1)]" />
                    </div>
                  </div>

                  <button type="submit" className={`group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-4 transition-all duration-300 ${reqType === "HIRE" ? "bg-[#FFB800] text-black shadow-[0_0_20px_rgba(255,184,0,0.3)] hover:shadow-[0_0_35px_rgba(255,184,0,0.5)]" : "bg-[#4FD1FF] text-black shadow-[0_0_20px_rgba(79,209,255,0.3)] hover:shadow-[0_0_35px_rgba(79,209,255,0.5)]"}`}>
                    <span className="font-display text-base font-black uppercase tracking-widest">TRANSMIT MESSAGE</span>
                    <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* --- FASE 3: TRASMISSIONE IN CORSO --- */}
            {formState === "transmitting" && (
              <motion.div className="relative z-10 text-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <div className="mb-6 flex justify-center">
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-[#FFB800]">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-[#FFB800] border-t-transparent" />
                    <Send size={30} className="text-[#FFB800] animate-pulse" />
                  </div>
                </div>
                <h2 className="font-display text-3xl font-black uppercase tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  TRANSMITTING...
                </h2>
                <p className="hud-mono mt-2 text-xs font-bold tracking-[0.3em] text-[#FFB800]">
                  OPENING MAIL CLIENT
                </p>
                <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full bg-[#FFB800]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.5, ease: "easeInOut" }} />
                </div>
              </motion.div>
            )}
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
              onClick={handleHireClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FF8A00] py-4 shadow-[0_0_25px_rgba(255,184,0,0.3)] transition-all hover:shadow-[0_0_40px_rgba(255,184,0,0.5)]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                <div className="relative h-full w-10 bg-white/30" />
              </div>
              <span className="font-display text-base font-black uppercase tracking-widest text-black">HIRE ME NOW</span>
              <ChevronRight size={20} className="text-black transition-transform group-hover:translate-x-1" />
            </motion.button>

          </div>
        </div>
      </motion.div>
    </>
  );
}
