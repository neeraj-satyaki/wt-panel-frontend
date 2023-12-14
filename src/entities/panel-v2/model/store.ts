import { create } from 'zustand'

type AppOrSaleStore = {
  currentCategory: string
  type: string
  changeCategory: (category: string, type: string) => void
  q: string
  setQ: (value: string) => void
  page: number
  setPage: (value: number) => void
}

export const useAppOrSaleStore = create<AppOrSaleStore>((set) => ({
  currentCategory: 'Все',
  type: '',
  changeCategory: (category, type) => set({ currentCategory: category, type: type }),
  q: '',
  setQ: (value) => set({ q: value }),
  page: 1,
  setPage: (value) => set({ page: value }),
}))
