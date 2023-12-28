import { IconCross } from '@/shared/ui/icons/icon-cross'
import { useSessionQuery } from '@/entities/session'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Nav } from './nav'
import { UiLogo } from './ui-logo'
import { mobileMenuStore } from '../model/mobile-menu.store'

export default function MobileMenu() {
  const session = useSessionQuery()
  const { handleIsShow } = mobileMenuStore()

  return (
    <div className="fixed overflow-auto w-full h-screen top-0 left-0 bg-[#013789] z-30 justify-center pt-5">
      <button
        onClick={() => handleIsShow(false)}
        className="fixed top-6 right-4 text-white"
      >
        <IconCross />
      </button>
      <div className="text-white text-center space-y-6">
        <UiLogo />
        {session.isLoading ? <UiSpinner className="text-white" /> : <Nav />}
      </div>
    </div>
  )
}
