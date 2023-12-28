import dynamic from 'next/dynamic'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { IconBurgerMenu } from '@/shared/ui/icons/icon-burger-menu'
import { mobileMenuStore } from '../model/mobile-menu.store'
import { UiLogo } from './ui-logo'
import { Button } from '@/shared/ui/components/ui/button'

const DynamicMobileMenu = dynamic(() => import('./mobile-menu'), {
  ssr: false,
  loading: () => <UiPageSpinner />,
})

export default function HeaderMobile() {
  const { isShow, handleIsShow } = mobileMenuStore()
  return (
    <>
      <header className="w-full py-4 px-4 flex justify-between bg-[#013789] shadow-sm shadow-[#C4CBDA] items-center">
        <div className="text-white">
          <UiLogo />
        </div>
        <Button
          onClick={() => handleIsShow(true)}
          className="flex items-center p-0"
          variant="ghost"
        >
          <IconBurgerMenu />
        </Button>
      </header>
      {isShow && <DynamicMobileMenu />}
    </>
  )
}
