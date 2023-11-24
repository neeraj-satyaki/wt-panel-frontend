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
      <div>
        <div className="430:hidden">
          <UiHeading level={'5'}>{title}</UiHeading>
        </div>
        <div className="hidden 430:block">
          <UiHeading level={'4'}>{title}</UiHeading>
        </div>
      </div>
      <div>{navigation}</div>
      <div>{content}</div>
    </div>
  )
}
