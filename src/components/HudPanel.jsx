import { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { Crosshair, Cpu, Wifi, Zap, Target, ShieldAlert, Cross } from "lucide-react";

const WEAPONS = [
  { id: "W-01", name: "PLASMA REPEATER", type: "ASSAULT", dmg: "840/s" },
  { id: "W-02", name: "RAILGUN", type: "SNIPER", dmg: "2400/hit" },
  { id: "W-03", name: "EMP GRENADE", type: "TACTICAL", dmg: "AOE" },
];

export default function HudPanel() {
  const ref = useRef(null);
  const [activeWep, setActiveWep] = useState(0);
  const [telemetry, setTelemetry] = useState("0x0000");

  // Molle per l'effetto 3D
  const rx = useSpring(0, { stiffness: 60, damping: 15 });
  const ry = useSpring(0, { stiffness: 60, damping: 15 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    // Calcola la rotazione in base alla posizione del mouse
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 25);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 20);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  // Generatore di Telemetria Live (numeri che impazziscono)
  useEffect(() => {
    const interval = setInterval(() => {
      const hex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0');
      setTelemetry(`0x${hex}`);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      // perspective e preserve-3d sono il segreto per far "uscire" gli elementi!
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] sm:aspect-square flex items-center justify-center"
      data-testid="hero-hud-panel"
    >
      {/* ================= BACKGROUND GLASS LAYER (Livello Base) ================= */}
      <div 
        className="absolute inset-4 rounded-[2rem] border border-white/5 bg-[#050B14]/40 backdrop-blur-md shadow-2xl overflow-hidden"
        style={{ transform: "translateZ(-20px)" }} // Spinto indietro
      >
        {/* Griglia Sfondo */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        
        {/* Glow Centrale */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-primary/20 blur-[60px]" />
      </div>

      {/* ================= RADAR CENTRALE (Livello Medio) ================= */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(20px)" }}>
        {/* Anello Esterno rotante */}
        <motion.div 
          className="absolute w-[240px] h-[240px] rounded-full border border-primary/20 border-t-primary/80 border-b-primary/80"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        {/* Anello Interno rotante inverso */}
        <motion.div 
          className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-white/20 border-l-white/60"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        {/* Mirino */}
        <Crosshair size={40} className="text-primary/40" />
      </div>

      {/* ================= WIDGET FLUTTUANTI (Livello Alto - Escono dallo schermo) ================= */}
      <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
        
        {/* TOP LEFT: Status Sistema */}
        <div className="absolute top-6 left-2 flex flex-col gap-1" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-center gap-2 text-primary">
            <Cpu size={14} />
            <span className="hud-mono text-[10px] font-bold tracking-[0.3em]">SYS.CORE</span>
          </div>
          <div className="h-[2px] w-24 bg-gradient-to-r from-primary to-transparent" />
          <span className="hud-mono text-[9px] text-white/50 mt-1">NUCLEUS_ONLINE</span>
        </div>

        {/* TOP RIGHT: Telemetria Live */}
        <div className="absolute top-6 right-2 flex flex-col items-end gap-1 text-right" style={{ transform: "translateZ(50px)" }}>
          <div className="flex items-center gap-2 text-[#00E676]">
            <span className="hud-mono text-[10px] font-bold tracking-[0.2em]">{telemetry}</span>
            <Wifi size={14} className="animate-pulse" />
          </div>
          <div className="h-[2px] w-20 bg-gradient-to-l from-[#00E676] to-transparent" />
          <span className="hud-mono text-[8px] text-[#00E676]/60 mt-1">UPLINK STABLE</span>
        </div>

        {/* MIDDLE LEFT: Barre Energia (Angolate) */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col gap-3 pl-2" style={{ transform: "translateZ(60px)" }}>
          {[
            { label: "SHIELD", val: "88%", color: "#4FD1FF" },
            { label: "ARMOR", val: "64%", color: "#F5C542" },
            { label: "POWER", val: "99%", color: "#00E676" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="hud-mono text-[8px] tracking-[0.2em] text-white/60">{stat.label}</span>
              <div className="flex items-center gap-2">
                <div className="h-1 w-16 bg-white/10 overflow-hidden skew-x-[-30deg]">
                  <motion.div 
                    className="h-full" 
                    style={{ backgroundColor: stat.color }} 
                    initial={{ width: 0 }}
                    animate={{ width: stat.val }}
                    transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
                  />
                </div>
                <span className="hud-mono text-[9px] font-bold" style={{ color: stat.color }}>{stat.val}</span>
              </div>
            </div>
          ))}
        </div>

        {/* MIDDLE RIGHT: Target Lock */}
        <div className="absolute top-1/2 right-2 -translate-y-1/2 flex flex-col items-end gap-2" style={{ transform: "translateZ(60px)" }}>
          <div className="flex items-center justify-center w-10 h-10 rounded border border-red-500/30 bg-red-500/10">
            <Target size={20} className="text-red-500 animate-ping" />
          </div>
          <span className="hud-mono text-[8px] text-red-400 tracking-[0.2em]">HOSTILE DETECTED</span>
          <span className="hud-mono text-[10px] font-bold text-red-500">DIST: 142.8m</span>
        </div>

      </div>

      {/* ================= BOTTOM WEAPON SELECTOR (Livello Altissimo - Interattivo) ================= */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] pointer-events-auto" 
        style={{ transform: "translateZ(80px)" }}
      >
        <div className="flex flex-col items-center bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Info Arma Attiva */}
          <div className="w-full flex justify-between items-end mb-3 border-b border-white/10 pb-2">
            <div className="flex flex-col">
              <span className="hud-mono text-[8px] text-primary tracking-[0.3em]">{WEAPONS[activeWep].type}</span>
              <motion.span 
                key={activeWep}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display text-lg font-bold text-white uppercase tracking-tight"
              >
                {WEAPONS[activeWep].name}
              </motion.span>
            </div>
            <div className="flex flex-col items-end">
              <span className="hud-mono text-[8px] text-white/50 tracking-[0.2em]">OUTPUT</span>
              <motion.span 
                key={`dmg-${activeWep}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="hud-mono text-xs font-bold text-white"
              >
                {WEAPONS[activeWep].dmg}
              </motion.span>
            </div>
          </div>

          {/* Selettore Slot */}
          <div className="flex w-full justify-between gap-2">
            {WEAPONS.map((wep, i) => {
              const isActive = i === activeWep;
              return (
                <button
                  key={wep.id}
                  onClick={() => setActiveWep(i)}
                  className={`relative flex-1 h-8 flex items-center justify-center rounded transition-all duration-300 overflow-hidden ${
                    isActive ? "bg-primary text-black" : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  <span className={`hud-mono text-[10px] font-bold tracking-[0.1em] relative z-10 ${isActive ? 'text-[#05080F]' : ''}`}>
                    {wep.id}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="active-wep-bg"
                      className="absolute inset-0 bg-primary shadow-[0_0_15px_var(--c-primary)]"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
