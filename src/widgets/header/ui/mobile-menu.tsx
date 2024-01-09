import { IconCross } from '@/shared/ui/icons/icon-cross'
import { useSessionQuery } from '@/entities/session'
import { Nav } from './nav'
import { UiLogo } from './ui-logo'
import { mobileMenuStore } from '../model/mobile-menu.store'

export default function MobileMenu() {
  const session = useSessionQuery()
  const { handleIsShow } = mobileMenuStore()

  return (
    <div className="fixed overflow-auto w-full h-screen top-0 left-0 bg-blue-900 z-30 justify-center pt-5">
      <button
        onClick={() => handleIsShow(false)}
        className="fixed top-6 right-4 text-white"
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
