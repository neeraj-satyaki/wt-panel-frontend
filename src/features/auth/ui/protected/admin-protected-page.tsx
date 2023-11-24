import { useSessionQuery } from '@/entities/session/queries'
import { routes } from '@/shared/constants/routing'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export function AdminProtectedPage({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { isError, isLoading, data } = useSessionQuery()
  if (isLoading) return <UiPageSpinner />
  if (isError) router.replace(routes.SIGN_IN)
  if (!data) return null
  if (!data.roles.some((role) => role.title === 'Администратор'))
    router.replace(routes.MY_PROFILE)
  return <>{children}</>
}
