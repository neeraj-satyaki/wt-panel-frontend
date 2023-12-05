import { authControllerSignInOneC } from '@/shared/api/generated'
import { routes } from '@/shared/constants/routing'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface CustomError extends Error {
  response?: {
    data: {
      message: string
      error: string
      statusCode: number
    }
  }
}

export function useSignInForm() {
  const router = useRouter()

  const { register, handleSubmit } = useForm<{
    phone: string
    password: string
  }>()

  const signInMutation = useMutation({
    mutationFn: authControllerSignInOneC,
    onSuccess() {
      router.push(routes.PERSONAL_AREA)
    },
  })

  const errorMessage = signInMutation.error
    ? (signInMutation.error as CustomError).response?.data.message ||
      'Произошла ошибка, попробуйте позже'
    : undefined

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit((data) => signInMutation.mutate(data)),
    isLoading: signInMutation.isPending,
  }
}

export function useShowPassword() {
  const [show, setShow] = useState<boolean>(false)
  function open() {
    setShow(true)
  }
  function close() {
    setShow(false)
  }
  return { isShow: show, open, close }
}
