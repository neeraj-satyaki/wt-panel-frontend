import { create } from 'zustand'

type MovingProductState = {
  productId: string
  place: string
  type: number
  step: number
  faketype: number
  setFakeType: (value: number) => void
  setStep: (value: number) => void
  setType: (value: number) => void
  handleScanProductId: (decodedText: string) => void
  handleScanPlace: (decodedText: string) => void
  resetValues: () => void
  clearProduct: () => void
  clearPlace: () => void
}

export const useMovingProductState = create<MovingProductState>((set) => ({
  productId: '',
  place: '',
  type: 1,
  step: 0,
  faketype: 1,
  setFakeType: (value) => set({ faketype: value }),
  setStep: (value) => set({ step: value }),
  setType: (value) => set({ type: value }),
  clearPlace() {
    set({ place: '' })
  },
  clearProduct() {
    set({ productId: '' })
  },
  handleScanProductId(decodedText: string) {
    set({ productId: decodedText })
  },
  handleScanPlace(decodedText: string) {
    set({ place: decodedText })
  },
  resetValues() {
    set({ productId: '', place: '', type: 1, step: 0, faketype: 1 })
  },
}))
