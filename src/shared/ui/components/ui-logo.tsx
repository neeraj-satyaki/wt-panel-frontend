import { routes } from '@/shared/constants/routing'
import Link from 'next/link'

export function UiLogo() {
  return (
    <Link href={routes.PANEL} className="text-lg font-extrabold">
      WT PANEL
    </Link>
  )
}
