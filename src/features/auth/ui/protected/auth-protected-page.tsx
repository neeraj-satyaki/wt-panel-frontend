import { useSessionQuery } from '@/entities/session/queries'
import { routes } from '@/shared/constants/routing'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export function AuthProtectedPage({ children }: { children: ReactNode }) {
  // const router = useRouter()
  // const { isError, isLoading, data } = useSessionQuery()
  // if (isLoading) return <UiPageSpinner />
  // if (isError) router.replace(routes.SIGN_IN)
  // if (!data) return <div>Error</div>
  return <>{children}</>
}
