import { create } from 'zustand'

interface HeaderStore {
  isHeaderVisible: boolean
  toggleHeaderVisibility: () => void
}

export const useHeaderStore = create<HeaderStore>((set) => {
  const isLocalStorageAvailable = typeof localStorage !== 'undefined'

  const savedIsHeaderVisible = isLocalStorageAvailable
    ? localStorage.getItem('isHeaderVisible')
    : null

  const initialIsHeaderVisible = savedIsHeaderVisible
    ? JSON.parse(savedIsHeaderVisible)
    : true

  return {
    isHeaderVisible: initialIsHeaderVisible,
    toggleHeaderVisibility: () =>
      set((state) => {
        const newVisibility = !state.isHeaderVisible

        if (isLocalStorageAvailable)
          localStorage.setItem('isHeaderVisible', JSON.stringify(newVisibility))

        return { isHeaderVisible: newVisibility }
      }),
  }
})
