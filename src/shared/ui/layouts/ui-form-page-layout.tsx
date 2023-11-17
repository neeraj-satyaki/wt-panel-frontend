import Image from 'next/image'
import { ReactNode } from 'react'
import { UiHeading } from '../components/ui-heading'

export const UiFormPageLayout = ({
  title,
  form,
}: {
  title: string
  form: ReactNode
}) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="absolute w-[90%] 744:w-[50%] 1024:w-[40%] p-10 justify-center flex flex-col gap-2 1280:w-[30%] 1512:w-[24%] overflow-auto bg-white rounded-lg shadow-lg z-50">
        <UiHeading level={'3'} className="text-center">
          {title}
        </UiHeading>
        {form}
      </div>
      <div className="relative w-full h-full">
        <Image
          width={1920}
          height={1080}
          src={
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt={'Company'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
      </div>
    </div>
  )
}
