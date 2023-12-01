import { ReactNode } from 'react'
import { HeaderDekstop } from './header-dekstop'
import { HeaderMobile } from './header-mobile'
import clsx from 'clsx'
import { useHeaderStore } from '../model/store'

export const HeaderLayout = ({ children }: { children: ReactNode }) => {
  const { isHeaderVisible } = useHeaderStore()

  return (
    <div>
      <div className="hidden 1280:flex">
        <div
          className={clsx('shadow-md z-20 flex flex-col', {
            'w-[12%]': isHeaderVisible,
            'w-[3%]': !isHeaderVisible,
          })}
        >
          <HeaderDekstop />
        </div>

        <div
          className={clsx('py-[32px] overflow-auto h-screen px-[22px] relative ', {
            'w-[88%]': isHeaderVisible,
            'w-[97%]': !isHeaderVisible,
          })}
        >
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
