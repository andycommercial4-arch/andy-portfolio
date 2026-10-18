import { useRef, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { Menu, Settings, Coins, Gem, MessageSquare, Sword, Shield, Zap, Flame, Compass, ChevronRight, Activity, Crown } from "lucide-react";

const SLOTS = [
  { id: 1, Icon: Sword, label: "Neon Blade" },
  { id: 2, Icon: Shield, label: "Aegis Shield" },
  { id: 3, Icon: Zap, label: "Dash" },
  { id: 4, Icon: Flame, label: "Flame Orb" },
  { id: 5, Icon: Compass, label: "Radar" },
];

const CHAT = [
  { name: "AndyDev", text: "nuova UI online!" },
  { name: "NeonRider", text: "gg wp" },
];

const BOARD = [
  { name: "AndyDev", pts: 128 },
  { name: "NeonRider", pts: 96 },
  { name: "PixelQueen", pts: 74 },
];

export default function HudPanel() {
  const ref = useRef(null);
  const [slot, setSlot] = useState(1);
  
  // Molle per l'effetto 3D ultra-fluido
  const rx = useSpring(0, { stiffness: 70, damping: 15 });
  const ry = useSpring(0, { stiffness: 70, damping: 15 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 15);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  const active = SLOTS.find((s) => s.id === slot);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="group relative w-full max-w-[350px] sm:max-w-md"
      data-testid="hero-hud-panel"
    >
      {/* Decorative Sci-Fi Corners */}
      <div className="absolute -inset-1 border border-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-xl pointer-events-none" />
      <div className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-primary/70 pointer-events-none" />
      <div className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-primary/70 pointer-events-none" />
      <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-primary/70 pointer-events-none" />
      <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-primary/70 pointer-events-none" />

      {/* Main Glass Panel */}
      <div className="hud-panel relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#0B1221]/95 to-[#05080F]/95 shadow-2xl backdrop-blur-xl">
        
        {/* Holographic Scanline Effect */}
        <motion.div 
          className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-primary/20 blur-[2px]"
          animate={{ y: ["0%", "4000%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-white/[0.02] px-3 py-2.5 sm:px-4">
          <button className="hud-icon-btn relative hover:bg-white/10 p-1 rounded-md transition-colors" aria-label="Game menu" data-testid="hud-menu-button">
            <Menu size={15} className="text-slate-300" />
            <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          </button>
          
          <div className="flex flex-col items-center">
            <span className="hud-mono text-[11px] font-extrabold tracking-[0.2em] text-white sm:text-[12px] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">NEON TYPHOON</span>
            <span className="hud-mono text-[7px] tracking-[0.3em] text-primary">SERVER_US_EAST_01</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
              <Coins size={10} style={{ color: "#F5C542" }} />
              <span className="hud-mono text-[10px] font-bold text-slate-200">1.2K</span>
            </div>
            <div className="hidden items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded border border-white/5 sm:flex">
              <Gem size={10} style={{ color: "#4FD1FF" }} />
              <span className="hud-mono text-[10px] font-bold text-slate-200">86</span>
            </div>
            <button className="hud-icon-btn hover:rotate-90 transition-transform duration-300" aria-label="Game settings" data-testid="hud-settings-button">
              <Settings size={15} className="text-slate-400 hover:text-white" />
            </button>
          </div>
        </div>

        {/* MIDDLE SECTION: Chat & Leaderboard */}
        <div className="grid grid-cols-[1.2fr_1fr] gap-3 p-3 sm:p-4">
          {/* CHAT BOX */}
          <div className="relative rounded-lg border border-white/5 bg-black/30 p-2.5 shadow-inner" data-testid="hud-chat">
            <div className="mb-2 flex items-center justify-between border-b border-white/5 pb-1.5">
              <div className="flex items-center gap-1.5 text-slate-400">
                <MessageSquare size={10} className="text-primary" />
                <span className="hud-mono text-[9px] font-bold tracking-widest">COMMS</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hud-mono text-[7px] text-emerald-500/70">LIVE</span>
              </div>
            </div>
            <div className="space-y-1.5">
              {CHAT.map((c) => (
                <p key={c.name} className="font-mono text-[10px] leading-tight text-slate-300">
                  <span className="font-semibold text-[#4FD1FF]">[{c.name}]</span>: {c.text}
                </p>
              ))}
            </div>
          </div>

          {/* LEADERBOARD BOX */}
          <div className="relative rounded-lg border border-white/5 bg-black/30 p-2.5 shadow-inner" data-testid="hud-leaderboard">
            <div className="mb-2 flex items-center gap-1.5 border-b border-white/5 pb-1.5 text-slate-400">
              <Activity size={10} className="text-[#F5C542]" />
              <span className="hud-mono text-[9px] font-bold tracking-widest">RANKING</span>
            </div>
            <div className="space-y-1.5">
              {BOARD.map((b, i) => (
                <div key={b.name} className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1.5">
                    {i === 0 ? <Crown size={10} className="text-[#F5C542]" /> : <span className="w-[10px] text-center font-mono text-slate-500">{i + 1}</span>}
                    <span className="font-medium text-slate-300 truncate w-16">{b.name}</span>
                  </div>
                  <span className="font-mono font-bold text-primary">{b.pts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATUS BARS SECTION */}
        <div className="space-y-2 px-4 py-1">
          {/* HP Bar */}
          <div className="flex items-center gap-2.5">
            <span className="hud-mono text-[9px] font-bold tracking-[0.2em] text-[#00E676] w-5">HP</span>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10 ring-1 ring-black shadow-inner">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full shadow-[0_0_10px_#00E676]"
                style={{ background: "linear-gradient(90deg, #00C853, #00E676)" }}
                initial={{ width: "10%" }}
                animate={{ width: "82%" }}
                transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="hud-mono text-[10px] font-bold text-slate-300">82%</span>
          </div>

          {/* Shield Bar */}
          <div className="flex items-center gap-2.5">
            <span className="hud-mono text-[9px] font-bold tracking-[0.2em] text-[#4FD1FF] w-5">AP</span>
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10 ring-1 ring-black shadow-inner">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full shadow-[0_0_10px_#4FD1FF]"
                style={{ background: "linear-gradient(90deg, #00B0FF, #4FD1FF)" }}
                initial={{ width: "0%" }}
                animate={{ width: "45%" }}
                transition={{ delay: 1.2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="hud-mono text-[9px] text-slate-500">45%</span>
          </div>
        </div>

        {/* ACTION BAR / INVENTORY SLOTS */}
        <div className="mt-2 bg-gradient-to-t from-white/[0.03] to-transparent p-3 pb-4 pt-3 sm:p-4 sm:pb-5">
          {/* Animated Weapon Label */}
          <div className="mb-2.5 flex h-5 items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {active && (
                <motion.span 
                  key={active.id}
                  initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.2 }}
                  className="hud-mono rounded bg-white/10 px-3 py-1 text-[9px] font-bold tracking-[0.25em] text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/5"
                  data-testid="hud-equip-label"
                >
                  {active.label.toUpperCase()}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Slot Buttons */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {SLOTS.map(({ id, Icon }) => {
              const isActive = slot === id;
              return (
                <button
                  key={id}
                  onClick={() => setSlot(id)}
                  className={`group relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg border transition-all duration-300 ${
                    isActive 
                      ? "border-primary bg-primary/20 text-white shadow-[0_0_15px_var(--c-primary-rgb)] scale-110" 
                      : "border-white/10 bg-black/40 text-slate-500 hover:border-white/30 hover:text-slate-300"
                  }`}
                  data-testid={`hud-slot-${id}`}
                  aria-label={`Equip ${SLOTS[id - 1].label}`}
                >
                  <span className={`absolute left-1 top-1 font-mono text-[7px] font-bold ${isActive ? 'text-primary' : 'text-slate-600'}`}>{id}</span>
                  <Icon size={16} className={`transition-transform duration-300 ${isActive ? 'drop-shadow-[0_0_5px_currentColor] scale-110' : ''}`} />
                </button>
              );
            })}
            
            {/* Backpack Button */}
            <button className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-slate-500 transition-colors hover:border-white/30 hover:text-white ml-1" aria-label="Backpack" data-testid="hud-slot-backpack">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
