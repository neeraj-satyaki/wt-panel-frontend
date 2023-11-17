export function IconBurgerMenu({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
    >
      <path d="M1 1H23" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M1 10H23" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M1 19H23" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
