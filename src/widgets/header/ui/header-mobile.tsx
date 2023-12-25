import dynamic from 'next/dynamic'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { IconBurgerMenu } from '@/shared/ui/icons/icon-burger-menu'
import { mobileMenuStore } from '../model/mobile-menu.store'
import { UiLogo } from './ui-logo'

const DynamicMobileMenu = dynamic(() => import('./mobile-menu'), {
  ssr: false,
  loading: () => <UiPageSpinner />,
})

export default function HeaderMobile() {
  const { isShow, handleIsShow } = mobileMenuStore()
  return (
    <>
      <header className="w-full py-4 px-4 flex justify-between bg-primary shadow-sm shadow-[#C4CBDA] items-center">
        <div className="text-white">
          <UiLogo />
        </div>
        <button onClick={() => handleIsShow(true)} className="flex items-center">
          <IconBurgerMenu />
        </button>
      </header>
      {isShow && <DynamicMobileMenu />}
    </>
  )
}
