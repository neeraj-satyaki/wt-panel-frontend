import { HeaderDekstop } from '@/widgets/header'
import { HeaderMobile } from '@/widgets/header/ui/header-mobile'
import { ReactNode } from 'react'

export const UiHeaderLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="hidden 1280:flex">
        <div className="w-[10%] shadow-md">
          <HeaderDekstop />
        </div>
        <div className="w-[90%] py-[32px] overflow-auto h-screen px-[22px] relative">{children}</div>
      </div>

      <div className="block 1280:hidden">
        <div className="shadow-md">
          <HeaderMobile />
        </div>
        <div className="w-full pt-4 pb-20 overflow-auto h-screen px-2 relative 744:px-[22px] 744:py-[40px]">
          {children}
        </div>
      </div>
    </>
  )
}
