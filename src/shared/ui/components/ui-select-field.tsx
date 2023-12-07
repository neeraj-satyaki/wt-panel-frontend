import clsx from 'clsx'
import { OptionHTMLAttributes, PropsWithRef, SelectHTMLAttributes, useId } from 'react'

export type UiSelectOptionProps = PropsWithRef<OptionHTMLAttributes<HTMLOptionElement>>

export type UiSelectOption = {
  label: string
  value: string
  optionProps?: UiSelectOptionProps
}

export type UiSelectFieldProps = {
  className?: string
  label?: string
  error?: string
  selectProps?: PropsWithRef<SelectHTMLAttributes<HTMLSelectElement>>
  options?: UiSelectOption[]
}

export function UiSelectField({
  className,
  error,
  label,
  selectProps,
  options,
}: UiSelectFieldProps) {
  const id = useId()

  return (
    <div className={clsx(className, 'flex flex-col gap-1')}>
      {label && (
        <label htmlFor={id} className="block opacity-60">
          {label}
        </label>
      )}
      <select
        {...selectProps}
        id={id}
        className={clsx(
          selectProps?.className,
          'rounded border border-slate-300 focus:border-slate-600 px-2 py-3 outline-none',
          { 'border-rose-400': error },
        )}
      >
        {options?.map((option, i) => (
          <option
            key={i}
            value={option.value}
            {...option.optionProps} // Применение optionProps
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  )
}
