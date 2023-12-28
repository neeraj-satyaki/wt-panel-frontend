import { IconCross } from '@/shared/ui/icons/icon-cross'
import clsx from 'clsx'
import { useSessionQuery } from '@/entities/session'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Nav } from './nav'
import { UiLogo } from './ui-logo'
import { mobileMenuStore } from '../model/mobile-menu.store'

export default function MobileMenu() {
  const session = useSessionQuery()
  const { isShow, handleIsShow } = mobileMenuStore()

  return (
    <div
      className={clsx(
        'fixed overflow-auto w-full h-screen top-0 left-0 bg-[#3352b9] z-30 justify-center pt-5',
      )}
    >
      <button
        onClick={() => handleIsShow(false)}
        className="fixed top-5 right-5 text-white"
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
