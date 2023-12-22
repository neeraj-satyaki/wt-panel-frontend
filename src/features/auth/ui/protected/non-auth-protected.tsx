import { useSessionQuery } from '@/entities/session/api'
import { routes } from '@/shared/constants/routing'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { useRouter } from 'next/router'
import { PropsWithChildren, ReactElement } from 'react'

export function nonAuthProtectedPage<P>(Component: (props: P) => ReactElement) {
  return function ProtectedPage(props: PropsWithChildren<P>) {
    const router = useRouter()
    const { isLoading, isSuccess, isError } = useSessionQuery()

    // Добавим проверку наличия ошибки
    if (isLoading) return <UiPageSpinner />
    if (isError) {
      // Можно добавить дополнительную логику обработки ошибки, например, запись в журнал
      // router.replace(routes.SIGN_IN)
      console.error('Error fetching session data:', isError)
      return <Component {...props} />
    }

    // Добавим проверку на успешное получение данных и перенаправление, если сессия активна
    if (isSuccess) {
      router.replace(routes.PERSONAL_AREA)
      return null // или другой компонент, который покажет, что пользователь перенаправлен
    }

    // Возвращаем компонент, если сессия неактивна
    return <Component {...props} />
  }
}
