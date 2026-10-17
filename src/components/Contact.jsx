import { useState } from "react";
import { toast } from "sonner";
import { Copy, Check, MessageSquare } from "lucide-react";
import { THEME_CONFIG } from "../theme";
import { Reveal } from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { brand } = THEME_CONFIG;

  const copyTag = async () => {
    try {
      await navigator.clipboard.writeText(brand.discord);
      setCopied(true);
      toast.success(`Discord tag copied: ${brand.discord}`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed — tag: " + brand.discord);
    }
  };

  return (
    <section id="contact" className="section-pad relative" data-testid="contact-section">
      <div className="wrap">
        <Reveal>
          <div className="contact-panel corners relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="contact-aura" aria-hidden="true" />
            <div className="relative z-10">
              <div className="eyebrow mb-5 inline-flex items-center gap-2">// 03 — CONTACT</div>
              <h2 className="font-display mx-auto max-w-2xl text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Let&apos;s build your next <span className="text-grad">interface</span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
                Have a game that needs a clean, high-performance UI? Reach out — Discord is the fastest way  TIME ZONE: UTC+2.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button className="discord-tag" onClick={copyTag} data-testid="contact-copy-discord" aria-label={`Copy Discord tag ${brand.discord}`}>
                  <span className="hud-mono tracking-[0.12em]" style={{ color: "var(--c-primary)" }}>{brand.discord}</span>
                  {copied ? <Check size={15} style={{ color: "var(--c-primary)" }} /> : <Copy size={15} className="text-slate-400" />}
                </button>
                <a
                  className="btn btn-gradient"
                  href={brand.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-cta-discord"
                >
                  <MessageSquare size={16} /> Open Discord
                </a>
              </div>

              <div className="mt-9 flex items-center justify-center gap-3">
                <span className="pulse-dot" />
                <span className="hud-mono text-[10px] tracking-[0.25em] text-slate-500">FASTEST REPLY ON DISCORD</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
