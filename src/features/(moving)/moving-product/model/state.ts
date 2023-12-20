import { create } from 'zustand'

type MovingProductState = {
  productId: string
  place: string
  type: number | null
  result: boolean | null
  setResult: (value: boolean) => void
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
  result: null,
  setResult: (value) => set({ result: value }),
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
    set({ productId: '', place: '', type: 1, result: null })
  },
}))
