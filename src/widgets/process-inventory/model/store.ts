import { create } from 'zustand'

type ProcessInventory = {
  placeId: string
  type: number | null
  changePlaceId: (id: string, type: number) => void
}

export const useProcessInventory = create<ProcessInventory>((set) => ({
  placeId: '',
  type: null,
  changePlaceId: (id, type) => set({ placeId: id, type: type }),
}))
