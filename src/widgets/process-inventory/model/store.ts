import { create } from 'zustand'

type ProcessInventory = {
  placeId: string
  type: number
  changePlaceId: (id: string, type: number) => void
}

export const useProcessInventory = create<ProcessInventory>((set) => ({
  placeId: '',
  type: 0,
  changePlaceId: (id, type) => set({ placeId: id, type: type }),
}))
