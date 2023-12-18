import { create } from 'zustand'

type SimilarProductsForChangeStore = {
  q: string
  setQ: (value: string) => void
  page: number
  setPage: (value: number) => void
  count: number
  selectedProduct: string
  setSelectProduct: (id: string) => void
}

export const useSimilarProductsForChangeStore = create<SimilarProductsForChangeStore>(
  (set) => ({
    q: '',
    setQ: (value) => set({ q: value }),
    page: 1,
    setPage: (value) => set({ page: value }),
    selectedProduct: '',
    setSelectProduct: (value) => set({ selectedProduct: value }),
    count: 48,
  }),
)
