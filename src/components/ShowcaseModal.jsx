import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Images } from "lucide-react";
import Placeholder from "./Placeholder";
import { lockScroll } from "../lib/scroll";

export default function ShowcaseModal({ item, index, onClose }) {
  // Blocca lo scroll della pagina sottostante
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
  const gallerySize = item.gallerySize || "large";

  // Classi dinamiche per le dimensioni delle immagini
  let gridClass = "";
  let imageClass = "";

  if (gallerySize === "small") {
    gridClass = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6";
    imageClass = "aspect-square object-cover";
  } else if (gallerySize === "medium") {
    gridClass = "grid-cols-1 md:grid-cols-2 gap-6 md:gap-8";
    imageClass = "aspect-video object-cover";
  } else if (gallerySize === "large") {
    gridClass = "grid-cols-1 gap-10 md:gap-16";
    imageClass = "h-auto w-full object-contain";
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#05080F] overflow-y-auto overscroll-none"
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-modal="true"
    >
      {/* TASTO BACK GALLEGGIANTE - INFALLIBILE (z-index 9999) */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        className="fixed left-4 top-4 z-[9999] flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/60 px-5 py-2.5 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:bg-white/10 md:left-8 md:top-8"
      >
        <ArrowLeft size={18} />
        <span className="hud-mono text-xs font-bold uppercase tracking-[0.2em] mt-0.5">
          Back
        </span>
      </button>

      {/* Contenuto principale della pagina (con padding top maggiorato per non coprire il titolo) */}
      <div className="mx-auto w-full max-w-6xl p-4 pt-24 sm:p-8 sm:pt-28 md:p-12 md:pt-32">
        
        {/* Header Progetto */}
        <div className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span
              className="chip px-4 py-1.5 text-sm"
              style={{
                borderColor: "rgba(var(--c-accent-rgb), 0.5)",
                color: "var(--c-accent)",
              }}
            >
              {item.category}
            </span>
            <span className="hud-mono text-[12px] tracking-[0.3em] text-slate-500">
              PROJECT_{String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-white md:text-6xl lg:text-7xl">
            {item.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
            {item.blurb}
          </p>

          {item.tags && item.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {item.tags.map((t) => (
                <span key={t} className="tag-mini px-3 py-1.5 text-sm">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Immagine di Copertina Grande */}
        <div className="relative mb-16 h-64 w-full overflow-hidden rounded-2xl md:h-[500px]">
          <Placeholder item={item} index={index} large />
          <div className="absolute inset-0 rounded-2xl border border-white/10" />
        </div>

        {/* Galleria Immagini */}
        <div className="mb-20">
          <div className="mb-8 flex items-center gap-3 border-b border-white/5 pb-4 text-white">
            <Images size={24} style={{ color: "var(--c-primary)" }} />
            <h2 className="hud-mono text-sm font-bold uppercase tracking-[0.25em] text-slate-200">
              Project Assets / ({galleryImages.length})
            </h2>
          </div>

          {galleryImages.length > 0 ? (
            <div className={`grid ${gridClass}`}>
              {galleryImages.map((imgSrc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="group relative overflow-hidden rounded-2xl bg-[#0A0F1A] shadow-2xl ring-1 ring-white/5"
                >
                  <img
                    src={imgSrc}
                    alt={`${item.title} asset ${i + 1}`}
                    className={`w-full transition-transform duration-700 ease-out ${
                      gallerySize !== "large" ? "group-hover:scale-105" : ""
                    } ${imageClass}`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.classList.add(
                        "flex", "items-center", "justify-center", "min-h-[300px]", "text-sm", "font-mono", "text-slate-500"
                      );
                      e.currentTarget.parentElement.innerText = `[ IMAGE MISSING: ASSET_${i + 1} ]`;
                    }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center text-lg text-slate-500">
              Awaiting assets upload...
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
