export default function Placeholder({ item, index, large = false }) {
  if (item.image) {
    return <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" data-testid={`showcase-image-${item.id}`} />;
  }
  return (
    <div className={`ph-panel ${large ? "ph-panel-lg" : ""}`} data-testid={`showcase-placeholder-${item.id}`}>
      <div className="ph-gridbg" aria-hidden="true" />
      <span className="corner-tl" aria-hidden="true" />
      <span className="corner-br" aria-hidden="true" />
      <div className="ph-center">
        <div className="ph-index">{String(index + 1).padStart(2, "0")}</div>
        <div className="ph-label">{item.title}</div>
        <div className="ph-cat">{item.category}</div>
      </div>
      <div className="ph-note">// PLACEHOLDER — SET IMAGE URL IN DATA FILE</div>
    </div>
  );
}