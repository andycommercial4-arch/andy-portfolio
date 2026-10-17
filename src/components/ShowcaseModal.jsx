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
  const gallerySize = item.gallerySize || "medium";

  // Configurazione dinamica in base alla taglia scelta
  let gridClass = "";
  let imageClass = "";

  if (gallerySize === "small") {
    gridClass = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4";
    imageClass = "aspect-square object-cover";
  } else if (gallerySize === "medium") {
    gridClass = "grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6";
    imageClass = "aspect-video object-cover";
  } else if (gallerySize === "large") {
    gridClass = "grid-cols-1 gap-6";
    imageClass = "h-auto w-full object-contain"; // Mostra tutto il frame senza tagliarlo
  }

  return (
    <motion.div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      data-testid="showcase-modal-backdrop"
    >
      <motion.div
        className="modal-panel relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[#080C14] shadow-2xl ring-1 ring-white/10"
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
        <div className="relative h-48 shrink-0 overflow-hidden md:h-64">
          <Placeholder item={item} index={index} large />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-transparent" />
          <button
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            onClick={onClose}
            aria-label="Close details"
            data-testid="showcase-modal-close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Contenuto Modale (SCROLL FIXATO QUI - max-h aumentata, overscroll-contain aggiunto) */}
        <div className="relative max-h-[65vh] overflow-y-auto overscroll-contain p-6 sm:p-8">
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

          {/* Sezione Dinamica Immagini */}
          <div className="mt-8">
            <div className="mb-5 flex items-center gap-2 text-white">
              <Images size={16} style={{ color: "var(--c-primary)" }} />
              <h4 className="hud-mono text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-300">
                Package Assets ({galleryImages.length})
              </h4>
            </div>

            {galleryImages.length > 0 ? (
              <div className={`grid ${gridClass}`}>
                {galleryImages.map((imgSrc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.04 }}
                    className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#0D131F] shadow-inner"
                  >
                    <img
                      src={imgSrc}
                      alt={`${item.title} asset ${i + 1}`}
                      className={`w-full transition-transform duration-500 ease-out group-hover:scale-[1.02] ${imageClass}`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.classList.add(
                          "flex",
                          "items-center",
                          "justify-center",
                          "min-h-[150px]",
                          "text-xs",
                          "text-slate-500",
                          "font-mono"
                        );
                        e.currentTarget.parentElement.innerText = `ASSET_${i + 1}`;
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
            <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-white/5">
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
