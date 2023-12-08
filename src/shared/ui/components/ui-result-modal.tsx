import AnimateSuccess from '../animations/success'
import AnimateError from '../animations/error'

type Props = {
  close: Function
  type: boolean
  text: string
}

export function UiResultModal({ close, type, text }: Props) {
  return (
    <div
      className={`fixed w-full bg-black/50 backdrop-blur-sm top-0 left-0 z-50 h-screen fade-in flex justify-center items-center flex-col`}
      onClick={() => close()}
    >
      <div
        className={`bg-white p-6 gap-6 overflow-auto rounded-xl flex items-center justify-center flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          {type ? <AnimateSuccess /> : <AnimateError />}
          <div className="text-xl font-semibold">{text}</div>
        </div>
      </div>
    </div>
  )
}
