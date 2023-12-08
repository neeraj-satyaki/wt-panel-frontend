import { create } from 'zustand'

type MovingProductState = {
  modal: boolean
  productId: string
  place: string
  type: number | null
  result: boolean | null
  setResult: (value: boolean) => void
  setType: (value: number) => void
  handleOpen: () => void
  handleClose: () => void
  handleScanProductId: (decodedText: string, decodedResult: any) => void
  handleScanPlace: (decodedText: string, decodedResult: any) => void
  resetValues: () => void
}

export const useMovingProductState = create<MovingProductState>((set) => ({
  modal: false,
  productId: '',
  place: '',
  type: null,
  result: null,
  setResult: (value) => set({ result: value }),
  setType: (value) => set({ type: value }),
  handleOpen: () => {
    set({ modal: true })
  },
  handleClose: () => {
    set({ modal: false })
  },
  handleScanProductId(decodedText: string, decodedResult: any) {
    set({ productId: decodedText })
  },
  handleScanPlace(decodedText: string, decodedResult: any) {
    set({ place: decodedText })
  },
  resetValues() {
    set({ productId: '', place: '', type: null })
  },
}))
