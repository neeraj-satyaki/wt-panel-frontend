import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { IconBurgerMenu } from '@/shared/ui/icons/icon-burger-menu'
import dynamic from 'next/dynamic'
import { useBurgerMenu } from '../model/use-burger-menu'
import { UiLogo } from './ui-logo'

const DynamicMobileMenu = dynamic(() => import('./mobile-menu'), {
  ssr: false,
  loading: () => <UiPageSpinner />,
})

export function HeaderMobile() {
  const { isShow, open, close } = useBurgerMenu()
  return (
    <>
      <header className="w-full py-4 px-4 flex justify-between bg-[#0847BA] shadow-sm shadow-[#C4CBDA] items-center">
        <div className="text-white">
          <UiLogo />
        </div>
        <button onClick={() => open()} className="flex items-center">
          <IconBurgerMenu />
        </button>
      </header>
      {isShow && <DynamicMobileMenu close={close} />}
    </>
  )
}
