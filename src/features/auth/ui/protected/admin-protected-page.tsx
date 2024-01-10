import { useSessionQuery } from '@/entities/session/api'
import { routes } from '@/shared/constants/routing'
import { userRoles } from '@/shared/constants/user-roles'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { useRouter } from 'next/router'
import { PropsWithChildren, ReactElement } from 'react'

export function adminProtectedPage<P>(Component: (props: P) => ReactElement) {
  return function ProtectedPage(props: PropsWithChildren<P>) {
    const router = useRouter()
    const { isError, isLoading, data } = useSessionQuery()
    if (isLoading) return <UiPageSpinner />
    if (isError) router.replace(routes.SIGN_IN)
    if (!data) return null
    if (!data.roles.some((role) => role.title === userRoles.ADMIN))
      router.replace(routes.PERSONAL_AREA)
    return <Component {...props} />
  }
}
