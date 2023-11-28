import { HeaderDekstop } from '@/widgets/header'
import { HeaderMobile } from '@/widgets/header/ui/header-mobile'
import { ReactNode } from 'react'

export const UiHeaderLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="hidden 1280:flex">
        <div className="w-[12%] shadow-md z-20">
          <HeaderDekstop />
        </div>
        <div className="w-[88%] py-[32px] overflow-auto h-screen px-[22px] relative">
          {children}
        </div>
      </div>

      <div className="block 1280:hidden">
        <div className="shadow-md fixed w-full z-20">
          <HeaderMobile />
        </div>
        <div className="w-full pt-20 pb-10 overflow-auto h-screen px-4 relative 744:px-2">
          {children}
        </div>
      </div>
    </div>
  )
}
