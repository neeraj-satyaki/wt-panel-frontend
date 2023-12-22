import { create } from 'zustand'

type ProcessInventory = {
  poddonId: string
  changePoddonId: (id: string) => void
}

export const useProcessInventory = create<ProcessInventory>((set) => ({
  poddonId: '',
  changePoddonId: (id) => set({ poddonId: id }),
}))
