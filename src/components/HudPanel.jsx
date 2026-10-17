import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { Menu, Settings, Coins, Gem, MessageSquare, Sword, Shield, Zap, Flame, Compass, ChevronRight } from "lucide-react";

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
  const rx = useSpring(0, { stiffness: 60, damping: 14 });
  const ry = useSpring(0, { stiffness: 60, damping: 14 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 9);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  const active = SLOTS.find((s) => s.id === slot);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="hud-panel corners relative w-full max-w-[350px] sm:max-w-md"
      data-testid="hero-hud-panel"
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2.5 sm:px-4">
        <button className="hud-icon-btn" aria-label="Game menu" data-testid="hud-menu-button">
          <Menu size={15} />
        </button>
        <span className="hud-mono text-[10px] font-bold tracking-[0.18em] text-white sm:text-[11px]">NEON TYPHOON</span>
        <div className="flex items-center gap-1.5">
          <span className="hud-currency"><Coins size={12} style={{ color: "#F5C542" }} />1,250</span>
          <span className="hud-currency hidden sm:inline-flex"><Gem size={12} style={{ color: "#4FD1FF" }} />86</span>
          <button className="hud-icon-btn hud-gear" aria-label="Game settings" data-testid="hud-settings-button">
            <Settings size={15} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1.1fr_1fr] gap-2.5 p-3 sm:p-4">
        <div className="hud-box" data-testid="hud-chat">
          <div className="hud-box-title"><MessageSquare size={10} /> CHAT</div>
          {CHAT.map((c) => (
            <p key={c.name} className="hud-chat-line">
              <span style={{ color: "#4FD1FF" }}>{c.name}:</span> {c.text}
            </p>
          ))}
        </div>
        <div className="hud-box" data-testid="hud-leaderboard">
          <div className="hud-box-title">TOP PLAYERS</div>
          {BOARD.map((b, i) => (
            <div key={b.name} className="hud-board-row">
              <span style={{ color: i === 0 ? "#F5C542" : "rgba(100,116,139,0.9)" }}>{i + 1}</span>
              <span className="truncate">{b.name}</span>
              <span className="hud-mono text-[10px]" style={{ color: "var(--c-primary)" }}>{b.pts}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2.5 px-4">
        <span className="hud-mono text-[8px] tracking-[0.2em] text-slate-500">HP</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "#00C853" }}
            initial={{ width: "4%" }}
            animate={{ width: "82%" }}
            transition={{ delay: 1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="hud-mono text-[9px] text-slate-400">82/100</span>
      </div>

      <div className="p-3 pb-4 pt-2 sm:p-4 sm:pb-5">
        <div className="mb-2 h-5 text-center">
          {active && <span className="hud-equip-label" data-testid="hud-equip-label">{active.label}</span>}
        </div>
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {SLOTS.map(({ id, Icon }) => (
            <button
              key={id}
              onClick={() => setSlot(id)}
              className={`hud-slot ${slot === id ? "hud-slot-active" : ""}`}
              data-testid={`hud-slot-${id}`}
              aria-label={`Equip ${SLOTS[id - 1].label}`}
            >
              <span className="hud-slot-num">{id}</span>
              <Icon size={15} />
            </button>
          ))}
          <button className="hud-slot" aria-label="Backpack" data-testid="hud-slot-backpack">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}