import { ReactNode } from 'react'
import { IconCross } from '../icons/icon-cross'
import clsx from 'clsx'

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
          `bg-white shadow-lg p-6 gap-6 overflow-auto w-full h-[90vh] rounded-t-lg slide-to-up`,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div>{children}</div>
      </div>
    </div>
  )
}
