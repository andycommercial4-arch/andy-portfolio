export default function Logo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--c-primary)" />
          <stop offset="1" stopColor="var(--c-secondary)" />
        </linearGradient>
      </defs>
      <path d="M16 2 28 9v14L16 30 4 23V9L16 2Z" stroke="url(#logo-grad)" strokeWidth="2" />
      <path d="M10.5 21.5 16 10l5.5 11.5M12.6 17.5h6.8" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}