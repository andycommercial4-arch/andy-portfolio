import { Figma, Gamepad2, Layers, PenTool, Image as ImageIcon, Zap, Frame, Scaling } from "lucide-react";
import { Reveal } from "./Reveal";

const PILLS = [
  { label: "Figma", Icon: Figma },
  { label: "Roblox Studio", Icon: Gamepad2 },
  { label: "UI/UX Systems", Icon: Layers },
  { label: "Vector Graphics", Icon: PenTool },
  { label: "Photoshop", Icon: ImageIcon },
  { label: "UI Motion & Animation", Icon: Zap },
  { label: "Wireframing", Icon: Frame },
  { label: "Scalable Layouts", Icon: Scaling },
];

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative" data-testid="skills-section">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow mb-5 inline-flex items-center gap-2">// 02 — SKILLS</div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            Skills &amp; <span className="text-grad">Software</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="hud-card mt-10 rounded-3xl p-7 sm:p-10 lg:p-14" data-testid="skills-card">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-14">
              <div>
                <h3 className="font-display text-xl font-bold text-white sm:text-2xl">Design systems that ship.</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  Every interface is built as an organized, token-based system — from wireframe to animated
                  hand-off, ready to drop straight into Roblox Studio.
                </p>
              </div>
              <div className="flex flex-wrap content-start gap-3">
                {PILLS.map(({ label, Icon }) => (
                  <span key={label} className="pill-skill" data-testid={`skill-pill-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                    <Icon size={15} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}