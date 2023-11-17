import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { UiButton } from '../components/ui-button'

export const UiBackBtnLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-2">
      <div>
        <UiButton
          variant={'outlined'}
          className="px-4 py-2"
          onClick={() => router.back()}
        >
          ←
        </UiButton>
      </div>
      <div>{children}</div>
    </div>
  )
}
