import clsx from 'clsx'
import { InputHTMLAttributes, PropsWithRef, ReactNode, useId } from 'react'

export type UiTextFieldProps = {
  className?: string
  label?: string
  error?: string
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>
  component?: ReactNode
}

export function UiTextField({
  className,
  error,
  label,
  inputProps,
  component,
}: UiTextFieldProps) {
  const id = useId()
  return (
    <div className={clsx(className, 'flex flex-col gap-1')}>
      {label && (
        <label htmlFor={id} className="block font-normal text-normal opacity-60">
          {label}
        </label>
      )}
      <div className="flex justify-between">
        <input
          {...inputProps}
          id={id}
          className={clsx(
            inputProps?.className,
            'rounded-lg border border-slate-300 focus:border-slate-600 pl-[14px] py-2 h-full outline-none w-full',
            { 'border-rose-400': error },
          )}
        />
        {component}
      </div>
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  )
}
