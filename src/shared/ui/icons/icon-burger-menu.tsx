export function IconBurgerMenu({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="24"
      viewBox="0 0 30 24"
      fill="none"
    >
      <path d="M2 2H28" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <path d="M2 12H28" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <path d="M2 22H28" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
