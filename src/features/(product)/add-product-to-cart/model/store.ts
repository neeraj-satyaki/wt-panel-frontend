import { create } from 'zustand'

type MovingProductState = {
  result: boolean | null
  setResult: (value: boolean) => void
  resetValues: () => void
}

export const useMovingProductState = create<MovingProductState>((set) => ({
  productId: '',
  place: '',
  result: null,
  setResult: (value) => set({ result: value }),
  resetValues() {
    set({ result: null })
  },
}))
