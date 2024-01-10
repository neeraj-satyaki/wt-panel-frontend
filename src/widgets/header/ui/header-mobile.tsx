import { IconBurgerMenu } from '@/shared/ui/icons/icon-burger-menu'
import { mobileMenuStore } from '../model/mobile-menu.store'
import { UiLogo } from './ui-logo'
import { Button } from '@/shared/ui/components/ui/button'
import { MobileMenu } from './mobile-menu'

export default function HeaderMobile() {
  const { isShow, handleIsShow } = mobileMenuStore()
  return (
    <>
      <header className="w-full py-2 px-4 flex justify-between bg-[#003362] shadow-sm shadow-[#C4CBDA] items-center">
        <div className="text-white">
          <UiLogo />
        </div>
        <Button
          onClick={() => handleIsShow(true)}
          className="flex items-center p-0 hover:bg-transparent"
          variant="ghost"
        >
          <IconBurgerMenu />
        </Button>
      </header>
      {isShow && <MobileMenu />}
    </>
  )
}
