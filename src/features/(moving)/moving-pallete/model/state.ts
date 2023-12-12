import { create } from 'zustand'

type MovingProductState = {
  palleteId: string
  place: string
  result: boolean | null
  setResult: (value: boolean) => void
  handleScanPalleteId: (decodedText: string, decodedResult: any) => void
  handleScanPlace: (decodedText: string, decodedResult: any) => void
  resetValues: () => void
}

export const useMovingPalletState = create<MovingProductState>((set) => ({
  palleteId: '',
  place: '',
  result: null,
  setResult: (value) => set({ result: value }),

  handleScanPalleteId(decodedText: string, decodedResult: any) {
    set({ palleteId: decodedText })
  },
  handleScanPlace(decodedText: string, decodedResult: any) {
    set({ place: decodedText })
  },
  resetValues() {
    set({ palleteId: '', place: '', result: null })
  },
}))
