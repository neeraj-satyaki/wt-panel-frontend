import { useSessionQuery } from '@/entities/session/api'
import { routes } from '@/shared/constants/routing'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { useRouter } from 'next/router'
import { PropsWithChildren, ReactElement } from 'react'

export function authProtectedPage<P>(Component: (props: P) => ReactElement) {
  return function ProtectedPage(props: PropsWithChildren<P>) {
    const router = useRouter()
    const { data, isError, isLoading } = useSessionQuery()

    // Добавим проверку наличия данных и обработаем случай, когда данные отсутствуют
    if (isLoading) return <UiPageSpinner />
    if (isError || !data) {
      // Можно добавить дополнительную логику обработки ошибки, например, запись в журнал
      console.error('Error fetching session data:', isError)
      router.replace(routes.SIGN_IN)
      return null // или другой компонент, который покажет, что что-то пошло не так
    }

    // Возвращаем компонент с данными сессии
    return <Component {...props} sessionData={data} />
  }
}
