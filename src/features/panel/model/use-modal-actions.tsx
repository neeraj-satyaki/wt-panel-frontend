import { useState } from 'react'

export function useModalActions() {
  const [show, setShow] = useState<boolean>(false)
  const [processing, setProcessing] = useState<string>('')
  const [subProcessing, setsubProcessing] = useState<string>('')
  const [itemId, setItemId] = useState<string>('')

  function open(processing: string, itemId: string, subProcessing: string) {
    setProcessing(processing)
    setsubProcessing(subProcessing)
    setItemId(itemId)
    setShow(true)
  }

  function close() {
    setShow(false)
    setProcessing('')
    setsubProcessing('')
    setItemId('')
    setShow(true)
  }
  return {
    isShow: show,
    open: (processing: string, itemId: string, subProcessing: string) =>
      open(processing, itemId, subProcessing),
    close,
    processing,
    subProcessing,
    itemId,
  }
}
