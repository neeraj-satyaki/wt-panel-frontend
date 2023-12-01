import { create } from 'zustand'

type ListProductsState = {
  q: string
  setQ: (value: string) => void
  page: number
  setPage: (value: number) => void
  prevPage: () => void
  nextPage: () => void
  currentPage: number
}

export const useListProductsState = create<ListProductsState>((set) => ({
  q: '',
  setQ: (value) => set({ q: value }),
  page: 1,
  setPage: (value) => set({ page: value }),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  currentPage: 1,
}))
