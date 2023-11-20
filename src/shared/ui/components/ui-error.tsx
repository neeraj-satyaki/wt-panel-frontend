import HasError from '@/public/has-error.svg'
import Image from 'next/image'
import { UiHeading } from './ui-heading'

export const UiError = () => {
  return (
    <div className="w-full justify-center items-center flex-col flex min-h-[80vh] ">
      <Image src={HasError} alt={'has error'} width={600} height={600} />
      <UiHeading level={'4'}>Технические неполадки</UiHeading>
    </div>
  )
}
