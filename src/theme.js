// ==============================================================
//  THEME CONFIG — Andy · Roblox UI Designer Portfolio
//  Modifica i colori qui: primary, secondary e accent aggiornano
//  all'istante glow, gradienti dei bottoni, bordi hover e aura.
//  Oppure cambia la chiave attiva in `preset`.
// ==============================================================
export const THEME_CONFIG = {
  preset: "cyber_cyan", // cyber_cyan | neon_synth | emerald_matrix | solar_flare
  presets: {
    cyber_cyan:     { name: "Cyber Cyan",     primary: "#00F0FF", secondary: "#7000FF", accent: "#FF007A" },
    neon_synth:     { name: "Neon Synthwave", primary: "#FF007A", secondary: "#9D00FF", accent: "#00F0FF" },
    emerald_matrix: { name: "Emerald Matrix", primary: "#00FF94", secondary: "#00B8FF", accent: "#CCFF00" },
    solar_flare:    { name: "Solar Flare",    primary: "#FF6B00", secondary: "#FF0055", accent: "#FFD600" },
  },
  brand: {
    name: "Andy",
    role: "Roblox UI Designer & Interface Specialist",
    tagline: "Crafting clean, intuitive, and high-performance user interfaces for Roblox experiences.",
    discord: "@andydev_",
    discordUrl: "https://discord.com",
  },
};

export const hexToRgb = (hex) => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

export const applyTheme = (presetKey) => {
  const p = THEME_CONFIG.presets[presetKey] || THEME_CONFIG.presets[THEME_CONFIG.preset];
  const s = document.documentElement.style;
  s.setProperty("--c-primary", p.primary);
  s.setProperty("--c-secondary", p.secondary);
  s.setProperty("--c-accent", p.accent);
  s.setProperty("--c-primary-rgb", hexToRgb(p.primary));
  s.setProperty("--c-secondary-rgb", hexToRgb(p.secondary));
  s.setProperty("--c-accent-rgb", hexToRgb(p.accent));
};