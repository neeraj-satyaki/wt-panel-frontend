import { ReactNode } from 'react'
import { UiHeading } from '../components/ui-heading'

export const UiFormPageLayout = ({
  title,
  form,
  background,
}: {
  title: string
  form: ReactNode
  background: any
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
        {background}
        <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
      </div>
    </div>
  )
}
