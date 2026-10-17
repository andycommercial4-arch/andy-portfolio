import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SHOWCASE_ITEMS, SHOWCASE_FILTERS } from "../data/showcase";
import Placeholder from "./Placeholder";
import ShowcaseDetail from "./ShowcaseDetail"; // BAU! Aggiornato l'import
import { Reveal } from "./Reveal";

const glowFollow = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export default function Showcase() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const items =
    filter === "All"
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((i) => i.category === filter);

  return (
    <section id="showcase" className="section-pad relative" data-testid="showcase-section">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow mb-5 inline-flex items-center gap-2">// 01 — SHOWCASE</div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              UI <span className="text-grad">Gallery</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              An asymmetrical bento of interface systems. Click a card for the full design breakdown.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {SHOWCASE_FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={`filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
                data-testid={`showcase-filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-12">
          {items.map((item) => {
            const index = SHOWCASE_ITEMS.indexOf(item);
            return (
              <motion.article
                layout
                key={item.id}
                className={`showcase-card group relative cursor-pointer overflow-hidden rounded-2xl ${item.spanMd} ${item.spanLg} ${item.height}`}
                onClick={() => setActive(item)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(item)}
                onMouseMove={glowFollow}
                tabIndex={0}
                role="button"
                aria-label={`Open details for ${item.title}`}
                data-testid={`showcase-card-${item.id}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Placeholder item={item} index={index} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#080C14]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                  <div>
                    <span
                      className="chip mb-2.5 inline-flex"
                      style={{
                        borderColor: "rgba(var(--c-accent-rgb), 0.5)",
                        color: "var(--c-accent)",
                      }}
                    >
                      {item.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white sm:text-xl">{item.title}</h3>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 3).map((t) => (
                        <span key={t} className="tag-mini">{t}</span>
                      ))}
                    </div>
                  </div>
                  <span className="view-hint">
                    VIEW <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <ShowcaseDetail
            item={active}
            index={SHOWCASE_ITEMS.indexOf(active)}
            onBack={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
