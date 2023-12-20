import { create } from 'zustand'

type AddingPhotosStore = {
  productId: string
  scannerProductId: boolean
  handleScannerProductId: (value: boolean) => void
  paddonId: string
  step: number
  handleProductId: (value: string) => void
  handleStep: (value: number) => void
  handlePadddonId: (value: string) => void
}

export const addingPhotosStore = create<AddingPhotosStore>((set) => ({
  scannerProductId: false,
  productId: '',
  step: 1,
  paddonId: '',
  handleProductId: (value: string) => set({ productId: value }),
  handleStep: (value: number) => set({ step: value }),
  handlePadddonId: (value: string) => set({ paddonId: value }),
  handleScannerProductId: (value: boolean) => set({ scannerProductId: value }),
}))
