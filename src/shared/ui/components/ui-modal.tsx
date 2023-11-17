import { ReactNode } from 'react'

export function UiModal({ content }: { content: ReactNode }) {
  return (
    <div className="flex flex-col shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)]  rounded-lg mt-3 text-center overflow-hidden">
      {content}
    </div>
  )
}
