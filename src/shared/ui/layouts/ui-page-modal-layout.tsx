import { ReactNode } from 'react'
import { IconCross } from '../icons/icon-cross'
import { UiButton } from '../components/ui-button'

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
      <button className="absolute right-8 top-8" onClick={() => close()}>
        <IconCross className="text-white" />
      </button>
      <div
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div>{children}</div>
        <UiButton variant={'primary'} className="px-4 py-2" onClick={() => close()}>
          Закрыть
        </UiButton>
      </div>
    </div>
  )
}
