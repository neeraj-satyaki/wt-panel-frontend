import { routes } from '@/shared/constants/routing'
import Link from 'next/link'
import { mobileMenuStore } from '../model/mobile-menu.store'

export function UiLogo() {
  const { handleIsShow } = mobileMenuStore()

  return (
    <Link
      className="font-extrabold text-2xl 744:text-2xl"
      href={routes.DESKTOP}
      onClick={() => handleIsShow(false)}
    >
      WT PANEL
    </Link>
  )
}
