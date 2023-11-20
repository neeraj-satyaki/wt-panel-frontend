import { useCreateSaleMutation, useMoveAppSale, useRefusalApplication } from '@/entities/panel/queries'
import { CreateSaleDto, MoveApplicationSaleDto, ReqRefusalDto } from '@/shared/api/generated'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export function useMoveAppSaleA() {
  const [modalSuccess, setModalSuccess] = useState(false)
  const moveAppSale = useMoveAppSale()

  useEffect(() => {
    console.log(modalSuccess)
    console.log(moveAppSale.isSuccess)
  }, [modalSuccess])

  return {
    handleSubmit: (data: MoveApplicationSaleDto) => {
      moveAppSale.mutate(data)
      setModalSuccess(true)
    },
    isLoading: moveAppSale.isPending,
    isError: moveAppSale.isError,
    isSuccess: moveAppSale.isSuccess,
    setModalSuccess,
    modalSuccess,
  }
}

export function useCreateSale() {
  const { handleSubmit, register } = useForm<{
    data: CreateSaleDto
  }>()

  const createSaleMutation = useCreateSaleMutation()

  return {
    handleSubmit: handleSubmit((data) => {
      createSaleMutation.mutate(data.data)
    }),
    register,
    isLoading: createSaleMutation.isPending,
    isError: createSaleMutation.isError,
    isSuccess: createSaleMutation.isSuccess,
  }
}

export function useRefuseApplication() {
  const refusalApplication = useRefusalApplication()

  return {
    handleSubmit: (data: ReqRefusalDto) => {
      refusalApplication.mutate(data)
    },
    isLoading: refusalApplication.isPending,
    isError: refusalApplication.isError,
    isSuccess: refusalApplication.isSuccess,
  }
}
