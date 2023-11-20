import clsx from 'clsx'

export type UiHeadingProps = {
  level: '1' | '2' | '3' | '4' | '5' | '6'
  children: React.ReactNode
  className?: string
}

export function UiHeading({ level, children, className }: UiHeadingProps) {
  switch (level) {
    case '1':
      return <h1 className={clsx(className, 'text-4xl font-bold text-[#454545]')}>{children}</h1>
    case '2':
      return <h2 className={clsx(className, 'text-[32px] font-bold text-[#454545]')}>{children}</h2>
    case '3':
      return <h3 className={clsx(className, 'text-2xl font-bold text-[#454545]')}>{children}</h3>
    case '4':
      return <h4 className="text-xl font-bold text-[#454545]">{children}</h4>
    case '5':
      return <h5 className="font-bold text-[#454545] text-base">{children}</h5>
    case '6':
      return <h6 className="text-base font-medium text-[#454545]">{children}</h6>
    default:
      return <h1 className="text-4xl font-bold text-[#454545]">{children}</h1>
  }
}
