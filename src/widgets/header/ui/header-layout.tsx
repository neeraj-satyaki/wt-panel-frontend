import React, { ReactNode, useEffect, useState, lazy, Suspense } from 'react'
import clsx from 'clsx'
import { useHeaderStore } from '../model/store'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'

// Импортируем компоненты с использованием React.lazy
const HeaderDekstop = lazy(() => import('./header-dekstop'))
const HeaderMobile = lazy(() => import('./header-mobile'))

export const HeaderLayout = ({ children }: { children: ReactNode }) => {
  const { isHeaderVisible } = useHeaderStore()
  const [first, setfirst] = useState(false)

  useEffect(() => {
    setfirst(true)
  }, [])

  if (!first) return <UiPageSpinner />

  return (
    <div>
      <div className="hidden 1280:flex">
        <div
          className={clsx('shadow-md z-20 flex flex-col', {
            'w-[12%]': isHeaderVisible,
            'w-[3%]': !isHeaderVisible,
          })}
        >
          {/* Оборачиваем компонент в Suspense */}
          <Suspense fallback={<UiPageSpinner />}>
            <HeaderDekstop />
          </Suspense>
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
          {/* Оборачиваем компонент в Suspense */}
          <Suspense fallback={<UiPageSpinner />}>
            <HeaderMobile />
          </Suspense>
        </div>
        <div className="w-full pt-24 pb-10 overflow-auto h-screen px-4 relative">
          {children}
        </div>
      </div>
    </div>
  )
}
