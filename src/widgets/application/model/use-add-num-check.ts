import { useCreateCheck } from '@/entities/panel/queries'
import { ReqCreateCheck } from '@/shared/api/generated'
import { useState } from 'react'

export function useCreateCheckA() {
  const createCheck = useCreateCheck()
  const [createCheckModal, setCreateCheckModal] = useState(false)

  return {
    handleSubmit: (data: ReqCreateCheck) => {
      createCheck.mutate(data)
    },
    isLoading: createCheck.isPending,
    isError: createCheck.isError,
    isSuccess: createCheck.isSuccess,
    createCheckModal,
    open: () => setCreateCheckModal(true),
    close: () => setCreateCheckModal(false),
  }
}
