import { create } from 'zustand'

type MobileMenuStore = {
  isShow: boolean
  handleIsShow: (value: boolean) => void
}

export const mobileMenuStore = create<MobileMenuStore>((set) => ({
  isShow: false,
  handleIsShow: (value: boolean) => set({ isShow: value }),
}))
