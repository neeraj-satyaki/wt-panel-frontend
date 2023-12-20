import { useResetSession } from '@/entities/session/api'
import { authControllerSignOut } from '@/shared/api/generated'
import { routes } from '@/shared/constants/routing'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export function useSignOut() {
  const resetSession = useResetSession()
  const router = useRouter()

  const singOutMutation = useMutation({
    mutationFn: authControllerSignOut,
    async onSuccess() {
      router.push(routes.SIGN_IN)
      resetSession()
    },
  })

  return {
    isLoading: singOutMutation.isPending,
    singOut: singOutMutation.mutate,
  }
}
