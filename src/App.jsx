import { useEffect } from "react";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Showcase from "./components/Showcase";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { THEME_CONFIG, applyTheme } from "./theme";
import { initLenis } from "./lib/scroll";

function App() {
  useEffect(() => {
    applyTheme(THEME_CONFIG.preset);
    initLenis();
  }, []);

  return (
    <div className="site relative min-h-screen overflow-x-clip bg-[#080C14] text-slate-100">
      <div className="aura" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Showcase />
        <Skills />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-white/5 py-8" data-testid="footer">
        <div className="wrap flex flex-wrap items-center justify-between gap-3">
          <span className="hud-mono text-[10px] tracking-[0.25em] text-slate-500">© {new Date().getFullYear()} ANDY</span>
          <span className="hud-mono text-[10px] tracking-[0.25em] text-slate-600">ROBLOX UI DESIGNER — PORTFOLIO</span>
        </div>
      </footer>
      <Toaster theme="dark" position="bottom-center" />
      <Analytics />
    </div>
  );
}

export default App;