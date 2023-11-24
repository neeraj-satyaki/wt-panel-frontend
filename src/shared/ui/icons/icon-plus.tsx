export function IconPlus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
    >
      <rect width="31" height="31" rx="15.5" fill="url(#paint0_linear_135_327)" />
      <rect
        x="23"
        y="14"
        width="3"
        height="15"
        rx="1.5"
        transform="rotate(90 23 14)"
        fill="white"
      />
      <rect x="14" y="8" width="3" height="15" rx="1.5" fill="white" />
      <defs>
        <linearGradient
          id="paint0_linear_135_327"
          x1="15.5"
          y1="0"
          x2="15.5"
          y2="31"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#03C7EF" />
          <stop offset="1" stopColor="#536BFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}
