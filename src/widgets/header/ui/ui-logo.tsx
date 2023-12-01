import clsx from 'clsx'

type Props = {
  isHeaderVisible?: boolean
}

export function UiLogo({ isHeaderVisible }: Props) {
  return (
    <div
      className={clsx('font-extrabold transition-all', {
        'text-lg': isHeaderVisible,
        'text-xl': !isHeaderVisible,
      })}
    >
      {isHeaderVisible ? 'WT PANEL' : 'WT'}
    </div>
  )
}
