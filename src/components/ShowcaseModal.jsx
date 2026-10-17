import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Images } from "lucide-react";
import Placeholder from "./Placeholder";

/**
 * ShowcaseModal Component
 * Full-page overlay displaying detailed project info and asset packages.
 */
export default function ShowcaseModal({ item, index, onClose }) {
  // ---------------------------------------------------------------------------
  // Scroll Lock & Keyboard Handling
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // Preserve initial body overflow style and lock background scroll
    const previousOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Dismiss modal on Escape key press
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Restore background scroll and remove keyboard listener
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // ---------------------------------------------------------------------------
  // Asset Grid Dimension Presets
  // ---------------------------------------------------------------------------
  const galleryImages = item.gallery || [];
  const gallerySize = item.gallerySize || "large";

  let gridClasses = "";
  let imageClasses = "";

  if (gallerySize === "small") {
    gridClasses = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5";
    imageClasses = "aspect-square object-cover";
  } else if (gallerySize === "medium") {
    gridClasses = "grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8";
    imageClasses = "aspect-video object-cover";
  } else {
    // Default / "large": single-column layout preserving natural asset dimensions
    gridClasses = "grid-cols-1 gap-8 md:gap-14";
    imageClasses = "h-auto w-full object-contain";
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-[#05080F]"
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} project details`}
    >
      {/* Scrollable Viewport Wrapper */}
      <div className="absolute inset-0 h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth pb-28 sm:pb-36">
        
        {/* Main Content Container: Adjusted top padding leaves room for the global site navbar */}
        <div className="mx-auto w-full max-w-6xl px-4 pt-20 sm:px-8 sm:pt-24 md:px-12 md:pt-28">
          
          {/* Project Header & Meta Controls */}
          <div className="mb-10 md:mb-14">
            
            {/* Top Bar: Inline Back Button + Category + Project ID */}
            <div className="mb-5 flex flex-wrap items-center gap-3 sm:gap-4 md:gap-5">
              
              {/* Back Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
                className="group inline-flex cursor-pointer items-center gap-2 text-slate-400 transition-colors hover:text-white"
                aria-label="Back to showcase gallery"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-white/10">
                  <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                </div>
                <span className="hud-mono text-xs font-bold uppercase tracking-[0.2em]">
                  Back
                </span>
              </button>

              {/* Aesthetic Divider */}
              <span className="hidden h-4 w-px bg-white/10 sm:inline-block" aria-hidden="true" />

              {/* Category Badge */}
              <span
                className="chip px-3.5 py-1 text-xs sm:text-sm font-medium"
                style={{
                  borderColor: "rgba(var(--c-accent-rgb), 0.5)",
                  color: "var(--c-accent)",
                }}
              >
                {item.category}
              </span>

              {/* Project Monospace ID */}
              <span className="hud-mono text-[11px] sm:text-[12px] tracking-[0.25em] text-slate-500">
                PROJECT_{String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Title & Description */}
            <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {item.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg md:text-xl">
              {item.blurb}
            </p>

            {/* Tags List */}
            {item.tags && item.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2 sm:gap-2.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag-mini px-3 py-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Primary Featured Cover Image */}
          <div className="relative mb-12 h-60 w-full overflow-hidden rounded-2xl sm:h-80 md:mb-16 md:h-[460px] lg:h-[520px]">
            <Placeholder item={item} index={index} large />
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />
          </div>

          {/* Assets Gallery Section */}
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-2.5 border-b border-white/5 pb-3.5 text-white md:mb-8">
              <Images size={20} style={{ color: "var(--c-primary)" }} aria-hidden="true" />
              <h2 className="hud-mono text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-slate-200">
                Project Assets ({galleryImages.length})
              </h2>
            </div>

            {galleryImages.length > 0 ? (
              <div className={`grid ${gridClasses}`}>
                {galleryImages.map((imgSrc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: 0.08, duration: 0.55 }}
                    className="group relative overflow-hidden rounded-2xl bg-[#0A0F1A] shadow-2xl ring-1 ring-white/5"
                  >
                    <img
                      src={imgSrc}
                      alt={`${item.title} asset preview ${i + 1}`}
                      className={`w-full transition-transform duration-500 ease-out ${
                        gallerySize !== "large" ? "group-hover:scale-105" : ""
                      } ${imageClasses}`}
                      loading="lazy"
                      onError={(e) => {
                        // Graceful fallback box if an asset is not found
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.classList.add(
                          "flex",
                          "items-center",
                          "justify-center",
                          "min-h-[240px]",
                          "text-xs",
                          "font-mono",
                          "text-slate-500"
                        );
                        e.currentTarget.parentElement.innerText = `[ ASSET_${i + 1} NOT FOUND ]`;
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-sm sm:text-base text-slate-500">
                Awaiting assets upload...
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
