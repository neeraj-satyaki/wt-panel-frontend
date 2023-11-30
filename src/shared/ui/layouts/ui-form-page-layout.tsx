import { ReactNode } from 'react'
import { UiHeading } from '../components/ui-heading'

export const UiFormPageLayout = ({ title, form }: { title: string; form: ReactNode }) => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-300">
      <div className="absolute w-[90%] 744:w-[50%] 1024:w-[40%] p-10 justify-center flex flex-col gap-2 1280:w-[30%] 1512:w-[24%] overflow-auto bg-white rounded-lg shadow-lg z-50">
        <UiHeading level={'3'} className="text-center">
          {title}
        </UiHeading>
        {form}
      </div>
    </div>
  )
}
