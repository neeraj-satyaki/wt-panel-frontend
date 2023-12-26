import { create } from 'zustand'

type CartStore = {
  page: number
  count: number
  handlePage: (value: number) => void
}

export const useCartStore = create<CartStore>((set) => ({
  page: 1,
  count: 20,
  handlePage: (value: number) => set({ page: value }),
}))
