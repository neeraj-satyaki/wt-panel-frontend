import { ReactNode } from 'react'
import { IconCross } from '../icons/icon-cross'
import clsx from 'clsx'
import { Button } from '../components/ui/button'

type Props = {
  close: Function
  children: ReactNode
}

export function UiPageModalLayout({ close, children }: Props) {
  return (
    <div
      className={`fixed w-full bg-black/50 backdrop-blur-sm  top-0 left-0 z-20 h-screen fade-in flex justify-between items-end flex-col`}
      onClick={() => close()}
    >
      <button className="m-8" onClick={() => close()}>
        <IconCross className="text-white" />
      </button>
      <div
        className={clsx(
          `bg-white p-6 gap-6 overflow-auto w-full flex flex-col h-[100vh] rounded-t-3xl slide-to-up 1280:w-[90vw] mx-auto`,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div>{children}</div>
        <div className="self-center" onClick={() => close()}>
          <Button variant={'primary'} className="px-4 py-2">
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  )
}
