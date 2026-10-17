const ITEMS = ["Main Menu HUDs", "Shop Interfaces", "Inventory Grids", "Tactical HUD", "UI Motion", "Figma → Roblox Studio"];

const Row = ({ hidden }) => (
  <div className="marquee-row" aria-hidden={hidden || undefined}>
    {ITEMS.map((item) => (
      <span key={item} className="marquee-item">
        {item}
        <span className="marquee-sep" aria-hidden="true">//</span>
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <div className="marquee" data-testid="marquee-band">
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}