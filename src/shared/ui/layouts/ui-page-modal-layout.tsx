import { ReactNode } from 'react'
import { IconCross } from '../icons/icon-cross'

type Props = {
  close: Function
  children: ReactNode
}

export function UiPageModalLayout({ close, children }: Props) {
  return (
    <div
      className="fixed w-full min-h-screen bg-black/50 backdrop-blur-sm flex justify-center items-center top-0 left-0 z-20"
      onClick={() => close()}
    >
      <button
        className="p-2 absolute right-4 top-4 border rounded-lg bg-white"
        onClick={() => close()}
      >
        <IconCross />
      </button>
      <div
        className="bg-white rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
