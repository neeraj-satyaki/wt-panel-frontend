import { useSessionQuery } from '@/entities/session/api'
import { routes } from '@/shared/constants/routing'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { useRouter } from 'next/router'
import { PropsWithChildren, ReactElement } from 'react'

export function authProtectedPage<P>(Component: (props: P) => ReactElement) {
  return function ProtectedPage(props: PropsWithChildren<P>) {
    const router = useRouter()
    const { isError, isLoading } = useSessionQuery()
    if (isLoading) return <UiPageSpinner />
    if (isError) router.replace(routes.SIGN_IN)
    return <Component {...props} />
  }
}
