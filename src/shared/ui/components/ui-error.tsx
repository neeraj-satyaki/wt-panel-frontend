import HasError from '@/public/has-error.svg'
import Image from 'next/image'
import { UiHeading } from './ui-heading'

type Props = {
  errorMessage?: string
}

export const UiError = ({ errorMessage }: Props) => {
  return (
    <div className="w-full justify-center items-center flex-col flex min-h-[60vh] ">
      <Image src={HasError} alt={'has error'} width={600} height={600} />
      <UiHeading level={'4'}>{errorMessage || 'Технические неполадки'}</UiHeading>
    </div>
  )
}
