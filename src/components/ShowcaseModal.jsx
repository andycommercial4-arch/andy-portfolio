import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Images } from "lucide-react";
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

  const galleryImages = item.gallery || [];

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
        className="modal-panel max-w-4xl"
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
        {/* Cover superiore */}
        <div className="relative h-56 overflow-hidden md:h-72">
          <Placeholder item={item} index={index} large />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-transparent to-transparent" />
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close details"
            data-testid="showcase-modal-close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Contenuto Modale */}
        <div className="max-h-[55vh] overflow-y-auto p-6 sm:p-8 md:max-h-[62vh]">
          {/* Categoria e Tag ID */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="chip"
              style={{
                borderColor: "rgba(var(--c-accent-rgb), 0.5)",
                color: "var(--c-accent)",
              }}
            >
              {item.category}
            </span>
            <span className="hud-mono text-[10px] tracking-[0.25em] text-slate-500">
              PROJECT_{String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Titolo e Descrizione */}
          <h3 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl">
            {item.title}
          </h3>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-400">
            {item.blurb}
          </p>

          {/* Sezione Cubi / Pacchetto Immagini */}
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2 text-white">
              <Images size={16} style={{ color: "var(--c-primary)" }} />
              <h4 className="hud-mono text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-300">
                Package Assets ({galleryImages.length})
              </h4>
            </div>

            {galleryImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
                {galleryImages.map((imgSrc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.08 + i * 0.04 }}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 shadow-inner"
                  >
                    <img
                      src={imgSrc}
                      alt={`${item.title} asset ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-108"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback visivo se l'immagine non è ancora presente
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.classList.add(
                          "flex",
                          "items-center",
                          "justify-center",
                          "text-xs",
                          "text-slate-500",
                          "font-mono"
                        );
                        e.currentTarget.parentElement.innerText = `ASSET_${i + 1}`;
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500">
                Nessuna immagine presente nel pacchetto.
              </div>
            )}
          </div>

          {/* Tags in basso */}
          {item.tags && item.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 pt-2 border-t border-white/5">
              {item.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
