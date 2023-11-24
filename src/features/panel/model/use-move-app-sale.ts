import {
  useCreateSaleMutation,
  useMoveAppSale,
  useRefusalApplication,
} from '@/entities/panel/queries'
import { CreateSaleDto } from '@/shared/api/generated'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface MyCustomError extends Error {
  response?: {
    data: {
      message: string
    }
  }
}
export function useMoveAppSaleA() {
  const moveAppSale = useMoveAppSale()
  const [res, setRes] = useState(false)

  useEffect(() => {
    if (moveAppSale.isPending || moveAppSale.isSuccess || moveAppSale.isError) {
      setRes(true)
    }
  }, [moveAppSale])

  const handleSubmit = (
    id: string,
    processing: string,
    subProcessing: string,
    type: string,
    moveMyself: boolean,
  ) => {
    moveAppSale.mutate({
      id,
      processing,
      sub_processing: subProcessing,
      type,
      move_myself: moveMyself,
    })
  }
  function closeRes() {
    setRes(false)
    moveAppSale.reset()
  }
  return {
    handleSubmit,
    isLoading: moveAppSale.isPending,
    isError: moveAppSale.isError,
    isSuccess: moveAppSale.isSuccess,
    res,
    closeRes,
  }
}

export function useCreateSale() {
  const { handleSubmit, register } = useForm<{
    data: CreateSaleDto
  }>()

  const createSaleMutation = useCreateSaleMutation()
  const error = createSaleMutation.error as MyCustomError | null

  return {
    handleSubmit: handleSubmit((data) => {
      createSaleMutation.mutate(data.data)
      createSaleMutation.reset()
    }),
    register,
    isLoading: createSaleMutation.isPending,
    isError: createSaleMutation.isError,
    isSuccess: createSaleMutation.isSuccess,
    error: error,
  }
}

export function useRefuseApplication() {
  const refuseApplication = useRefusalApplication()
  const [res, setRes] = useState(false)

  const handleSubmit = (id: string) => {
    refuseApplication.mutate({
      id,
    })
  }

  useEffect(() => {
    if (
      refuseApplication.isPending ||
      refuseApplication.isSuccess ||
      refuseApplication.isError
    ) {
      setRes(true)
    }
  }, [refuseApplication])

  function closeRes() {
    setRes(false)
    refuseApplication.reset()
  }

  return {
    handleSubmit,
    isLoading: refuseApplication.isPending,
    isError: refuseApplication.isError,
    isSuccess: refuseApplication.isSuccess,
    res,
    closeRes,
  }
}
