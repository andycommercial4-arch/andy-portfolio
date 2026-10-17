import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Images } from "lucide-react";
import Placeholder from "./Placeholder";
import { lockScroll } from "../lib/scroll";

export default function ShowcaseDetail({ item, index, onBack }) {
  // Blocca lo scroll della pagina sottostante mentre siamo in questa "nuova pagina"
  useEffect(() => {
    lockScroll(true);
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onBack();
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onBack]);

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
    imageClass = "h-auto w-full object-contain"; // Perfetto per frame UI completi
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
      {/* Top Navbar Sticky con tasto Back */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-[#05080F]/80 p-4 backdrop-blur-xl md:px-8">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-white/10">
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          </div>
          <span className="hud-mono text-xs tracking-[0.2em] font-bold uppercase">Back to Gallery</span>
        </button>
      </div>

      {/* Contenuto principale della pagina */}
      <div className="mx-auto w-full max-w-6xl p-4 sm:p-8 md:p-12">
        {/* Header Progetto */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span
              className="chip text-sm px-4 py-1.5"
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
                <span key={t} className="tag-mini text-sm px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Immagine di Copertina Grande */}
        <div className="relative mb-16 h-64 w-full overflow-hidden rounded-2xl md:h-[500px]">
          <Placeholder item={item} index={index} large />
          <div className="absolute inset-0 border rounded-2xl border-white/10" />
        </div>

        {/* Galleria Immagini */}
        <div className="mb-20">
          <div className="mb-8 flex items-center gap-3 text-white border-b border-white/5 pb-4">
            <Images size={24} style={{ color: "var(--c-primary)" }} />
            <h2 className="hud-mono text-sm font-bold tracking-[0.25em] uppercase text-slate-200">
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
                        "flex", "items-center", "justify-center", "min-h-[300px]", "text-sm", "text-slate-500", "font-mono"
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
