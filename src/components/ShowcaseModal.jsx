import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Check, Figma, Box } from "lucide-react";
import Placeholder from "./Placeholder";
import { lockScroll } from "../lib/scroll";

export default function ShowcaseModal({ item, index, onClose }) {
  useEffect(() => {
    lockScroll(true);
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      data-testid="showcase-modal-backdrop"
    >
      <motion.div
        className="modal-panel"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        data-testid="showcase-modal"
      >
        <div className="relative h-56 overflow-hidden md:h-72">
          <Placeholder item={item} index={index} large />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-transparent to-transparent" />
          <button className="modal-close" onClick={onClose} aria-label="Close details" data-testid="showcase-modal-close">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-6 sm:p-8 md:max-h-[60vh]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="chip" style={{ borderColor: "rgba(var(--c-accent-rgb), 0.5)", color: "var(--c-accent)" }}>{item.category}</span>
            <span className="hud-mono text-[10px] tracking-[0.25em] text-slate-500">PROJECT_{String(index + 1).padStart(2, "0")}</span>
          </div>

          <h3 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl">{item.title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">{item.blurb}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="modal-card">
              <div className="flex items-center gap-2 text-white">
                <Check size={15} style={{ color: "var(--c-primary)" }} />
                <h4 className="hud-mono text-[11px] font-semibold tracking-[0.22em]">FEATURES</h4>
              </div>
              <ul className="mt-4 space-y-2.5">
                {item.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    className="flex items-start gap-2.5 text-sm text-slate-300"
                    data-testid={`showcase-modal-feature-${i}`}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--c-primary)" }} />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="modal-card">
              <div className="flex items-center gap-2 text-white">
                <Box size={15} style={{ color: "var(--c-secondary)" }} />
                <h4 className="hud-mono text-[11px] font-semibold tracking-[0.22em]">FULL SPECS</h4>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.specs}</p>
            </div>

            <div className="modal-card">
              <div className="flex items-center gap-2 text-white">
                <Figma size={15} style={{ color: "var(--c-accent)" }} />
                <h4 className="hud-mono text-[11px] font-semibold tracking-[0.22em]">FIGMA</h4>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.figma}</p>
            </div>

            <div className="modal-card">
              <div className="flex items-center gap-2 text-white">
                <Box size={15} style={{ color: "var(--c-primary)" }} />
                <h4 className="hud-mono text-[11px] font-semibold tracking-[0.22em]">ROBLOX STUDIO</h4>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.studio}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}