import { HeaderDekstop } from '@/widgets/header'
import { HeaderMobile } from '@/widgets/header/ui/header-mobile'
import { ReactNode } from 'react'

export const UiHeaderLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="hidden 1280:flex">
        <div className="w-[12%] shadow-md">
          <HeaderDekstop />
        </div>
        <div className="w-[88%] py-[32px] overflow-auto h-screen px-[22px] relative">
          {children}
        </div>
      </div>

      <div className="block 1280:hidden">
        <div className="shadow-md">
          <HeaderMobile />
        </div>
        <div className="w-full pt-4 overflow-auto h-screen px-2 relative 744:px-[22px]">
          {children}
        </div>
      </div>
    </div>
  )
}
