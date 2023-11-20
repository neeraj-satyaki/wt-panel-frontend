import { useCreateSaleMutation, useMoveAppSale, useRefusalApplication } from '@/entities/panel/queries'
import { CreateSaleDto, MoveApplicationSaleDto, ReqRefusalDto } from '@/shared/api/generated'
import { useForm } from 'react-hook-form'

export function useMoveAppSaleA() {
  const moveAppSale = useMoveAppSale()

  return {
    handleSubmit: (data: MoveApplicationSaleDto) => {
      moveAppSale.mutate(data)
    },
    isLoading: moveAppSale.isPending,
    isError: moveAppSale.isError,
    isSuccess: moveAppSale.isSuccess,
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
