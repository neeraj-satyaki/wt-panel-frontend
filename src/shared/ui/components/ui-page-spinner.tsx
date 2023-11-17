import clsx from 'clsx'
import { UiSpinner } from './ui-spinner'

export function UiPageSpinner({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'absolute left-0 top-0 flex w-full h-screen items-center justify-center bg-slate-50 z-50',
        className,
      )}
    >
      <UiSpinner className="text-gray-600 w-20 h-20" />
    </div>
  )
}
