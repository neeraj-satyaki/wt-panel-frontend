import { IconCross } from '@/shared/ui/icons/icon-cross'
import { useSessionQuery } from '@/entities/session'
import { Nav } from './nav'
import { UiLogo } from './ui-logo'
import { mobileMenuStore } from '../model/mobile-menu.store'

export function MobileMenu() {
  const session = useSessionQuery()
  const { handleIsShow } = mobileMenuStore()

  return (
    <div className="fixed overflow-auto w-full h-screen top-0 left-0 bg-[#003362] z-30 justify-center pt-4">
      <button
        onClick={() => handleIsShow(false)}
        className="fixed top-4 right-4 text-white"
      >
        <IconCross />
      </button>
      <div className="text-white text-center space-y-6">
        <UiLogo />
        {session.isLoading ? <div>Загрузка...</div> : <Nav />}
      </div>
    </div>
  )
}
