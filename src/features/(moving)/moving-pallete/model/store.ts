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
  step: number
  setStep: (value: number) => void
}

export const useMovingPalletState = create<MovingProductState>((set) => ({
  palleteId: '',
  place: '',
  result: null,
  setResult: (value) => set({ result: value }),
  step: 0,

  setStep: (value) => set({ step: value }),

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
    set({ palleteId: '', place: '', result: null, step: 0 })
  },
}))
