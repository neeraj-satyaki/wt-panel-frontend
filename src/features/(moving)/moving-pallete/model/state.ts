import { create } from 'zustand'

type MovingProductState = {
  modal: boolean
  palleteId: string
  place: string
  result: boolean | null
  setResult: (value: boolean) => void
  handleOpen: () => void
  handleClose: () => void
  handleScanPalleteId: (decodedText: string, decodedResult: any) => void
  handleScanPlace: (decodedText: string, decodedResult: any) => void
  resetValues: () => void
}

export const useMovingPalletState = create<MovingProductState>((set) => ({
  modal: false,
  palleteId: '',
  place: '',
  result: null,
  setResult: (value) => set({ result: value }),
  handleOpen: () => {
    set({ modal: true })
  },
  handleClose: () => {
    set({ modal: false })
  },
  handleScanPalleteId(decodedText: string, decodedResult: any) {
    set({ palleteId: decodedText })
  },
  handleScanPlace(decodedText: string, decodedResult: any) {
    set({ place: decodedText })
  },
  resetValues() {
    set({ palleteId: '', place: '' })
  },
}))
