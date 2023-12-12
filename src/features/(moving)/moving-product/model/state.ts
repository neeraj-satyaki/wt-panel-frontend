import { create } from 'zustand'

type MovingProductState = {
  productId: string
  place: string
  type: number | null
  result: boolean | null
  setResult: (value: boolean) => void
  setType: (value: number) => void

  handleScanProductId: (decodedText: string, decodedResult: any) => void
  handleScanPlace: (decodedText: string, decodedResult: any) => void
  resetValues: () => void
}

export const useMovingProductState = create<MovingProductState>((set) => ({
  productId: '',
  place: '',
  type: 1,
  result: null,
  setResult: (value) => set({ result: value }),
  setType: (value) => set({ type: value }),

  handleScanProductId(decodedText: string, decodedResult: any) {
    set({ productId: decodedText })
  },
  handleScanPlace(decodedText: string, decodedResult: any) {
    set({ place: decodedText })
  },
  resetValues() {
    set({ productId: '', place: '', type: 0, result: null })
  },
}))
