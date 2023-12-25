type Props = {
  isHeaderVisible?: boolean
}

export function UiLogo({ isHeaderVisible }: Props) {
  return (
    <div className="font-extrabold text-3xl 744:text-2xl">
      {/* {isHeaderVisible ? 'WT PANEL' : 'WT'} */}
      WT PANEL
    </div>
  )
}
