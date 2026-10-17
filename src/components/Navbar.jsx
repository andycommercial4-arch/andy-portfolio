import { useState } from "react";
import Logo from "./Logo";
import { THEME_CONFIG, applyTheme } from "../theme";
import { scrollToId } from "../lib/scroll";

const LINKS = [
  { label: "Showcase", id: "showcase" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [preset, setPreset] = useState(THEME_CONFIG.preset);

  const pickPreset = (key) => {
    setPreset(key);
    applyTheme(key);
  };

  return (
    <header className="nav-bar" data-testid="navbar">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <button
          className="flex items-center gap-2.5"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-testid="navbar-logo-button"
          aria-label="Back to top"
        >
          <Logo />
          <span className="font-display text-sm font-bold tracking-widest text-white">ANDY<span style={{ color: "var(--c-primary)" }}>.</span></span>
        </button>

        <nav className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="nav-link"
              data-testid={`navbar-link-${l.id}`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex" title="Theme presets — edit THEME_CONFIG to customize">
          {Object.entries(THEME_CONFIG.presets).map(([key, p]) => (
            <button
              key={key}
              onClick={() => pickPreset(key)}
              aria-label={`Theme: ${p.name}`}
              data-testid={`theme-dot-${key}`}
              className="theme-dot"
              style={{
                background: p.primary,
                boxShadow: preset === key ? `0 0 12px ${p.primary}, 0 0 0 2px #080C14, 0 0 0 3.5px ${p.primary}` : "none",
              }}
            />
          ))}
        </div>
      </div>
    </header>
  );
}