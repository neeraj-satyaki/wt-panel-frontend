import { create } from 'zustand'

type ListProductsState = {
  q: string
  setQ: (value: string) => void
  page: number
  count: number
  setPage: (value: number) => void
  prevPage: () => void
  nextPage: () => void
  currentPage: number
  currentCategory: number
  setCurrentCategory: (value: number) => void // Fix the type here
}

export const useListProductsState = create<ListProductsState>((set) => ({
  q: '',
  setQ: (value) => set({ q: value }),
  page: 1,
  count: 70,
  setPage: (value) => set({ page: value }),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  currentPage: 1,
  currentCategory: 3,
  setCurrentCategory: (value) => set({ currentCategory: value, page: 1 }), // Fix the function here
}))
