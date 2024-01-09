import { ReactNode, useEffect, useState } from 'react'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import HeaderDekstop from './header-dekstop'
import HeaderMobile from './header-mobile'

export const HeaderLayoutWidget = ({ children }: { children: ReactNode }) => {
  const [first, setfirst] = useState(false)

  useEffect(() => {
    setfirst(true)
  }, [])

  if (!first) return <UiPageSpinner />

  return (
    <div>
      <div className="hidden 1512:flex ">
        <div className="shadow-md z-20 flex flex-col w-[12%]">
          <HeaderDekstop />
        </div>

        <div className="py-[32px] overflow-auto h-screen px-[22px] relative w-[88%]">
          {children}
        </div>
      </div>

      <div className="block 1512:hidden">
        <div className="shadow-md fixed w-full z-20 ">
          <HeaderMobile />
        </div>
        <div className="w-full pt-24 overflow-auto h-screen px-4 relative pb-32">
          {children}
        </div>
      </div>
    </div>
  )
}
