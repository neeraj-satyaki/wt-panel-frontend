import { routes } from '@/shared/constants/routing'
import Link from 'next/link'

export function UiLogo() {
  return (
    <Link className="font-extrabold text-3xl 744:text-2xl" href={routes.DESKTOP}>
      WT PANEL
    </Link>
  )
}
