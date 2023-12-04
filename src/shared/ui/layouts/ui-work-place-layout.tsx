import { ReactNode } from 'react'
import { UiHeading } from '../components/ui-heading'

type Props = {
  title: string
  navigation: ReactNode
  content: ReactNode
}

export function UiWorkPlaceLayout({ title, navigation, content }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <UiHeading level={'1'}>{title}</UiHeading>
      <div className="flex flex-col gap-2 1280:gap-2">
        <div>{navigation}</div>
        <div>{content}</div>
      </div>
    </div>
  )
}
