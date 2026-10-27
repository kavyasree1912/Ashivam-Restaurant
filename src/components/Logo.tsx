type LogoProps = { className?: string; size?: number };

export default function Logo({ className = '', size = 48 }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Saffron & Stones logo">
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" opacity=".65" />
      <path d="M18 60Q30 84 50 84Q70 84 82 60M24 64Q33 80 50 80Q67 80 76 64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".8" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {[30, 90, 150, 210, 270, 330].map((deg) => { const rad = (deg * Math.PI) / 180; return <line key={deg} x1={50 + 9 * Math.cos(rad)} y1={44 + 9 * Math.sin(rad)} x2={50 + 22 * Math.cos(rad)} y2={44 + 22 * Math.sin(rad)} />; })}
      </g>
      <path d="M50 24C46 34 50 37 47 43C45 47 48 49 50 51C52 49 55 47 53 43C50 37 54 34 50 24Z" fill="currentColor" />
    </svg>
  );
}
