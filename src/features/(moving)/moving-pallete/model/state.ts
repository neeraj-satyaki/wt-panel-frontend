import { create } from 'zustand'

type MovingProductState = {
  palleteId: string
  place: string
  result: boolean | null
  setResult: (value: boolean) => void
  handleScanPalleteId: (decodedText: string) => void
  handleScanPlace: (decodedText: string) => void
  resetValues: () => void
  clearPallete: () => void
  clearPlace: () => void
}

export const useMovingPalletState = create<MovingProductState>((set) => ({
  palleteId: '',
  place: '',
  result: null,
  setResult: (value) => set({ result: value }),

  clearPallete() {
    set({ palleteId: '' })
  },
  clearPlace() {
    set({ place: '' })
  },

  handleScanPalleteId(decodedText: string) {
    set({ palleteId: decodedText })
  },
  handleScanPlace(decodedText: string) {
    set({ place: decodedText })
  },
  resetValues() {
    set({ palleteId: '', place: '', result: null })
  },
}))
