import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

type UiButtonVariant = 'primary' | 'secondary' | 'outlined' | 'danger'

export type UiButtonProps = {
  variant: UiButtonVariant
} & ButtonHTMLAttributes<HTMLButtonElement>

export function UiButton({ className, variant, ...props }: UiButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        className,
        'h-full flex gap-2 justify-center items-center rounded-lg cursor-pointer transition-all text-md disabled:opacity-50 font-bold',
        {
          primary: 'bg-[#3277F6] rounded-lg font-semibold text-white hover:bg-[#0A59EB] transition-all',
          secondary: 'bg-green-400 text-white shadow shadow-green-500/30 hover:bg-green-600',
          outlined: 'border border-slate-300 shadow  hover:border-slate-400',
          danger: 'bg-rose-400 text-white  shadow-rose-500/30 hover:border-rose-400 hover:bg-rose-600',
        }[variant],
      )}
    />
  )
}
