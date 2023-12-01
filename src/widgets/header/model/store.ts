import { create } from 'zustand'

interface HeaderStore {
  isHeaderVisible: boolean
  toggleHeaderVisibility: () => void
}

export const useHeaderStore = create<HeaderStore>((set) => {
  // Check if localStorage is defined
  const isLocalStorageAvailable = typeof localStorage !== 'undefined'

  // Try to get the isHeaderVisible value from localStorage
  const savedIsHeaderVisible = isLocalStorageAvailable
    ? localStorage.getItem('isHeaderVisible')
    : null

  // Use the saved value if available, otherwise default to true
  const initialIsHeaderVisible = savedIsHeaderVisible
    ? JSON.parse(savedIsHeaderVisible)
    : true

  return {
    isHeaderVisible: initialIsHeaderVisible,
    toggleHeaderVisibility: () =>
      set((state) => {
        const newVisibility = !state.isHeaderVisible

        // Save the new visibility state to localStorage if available
        if (isLocalStorageAvailable) {
          localStorage.setItem('isHeaderVisible', JSON.stringify(newVisibility))
        }

        return { isHeaderVisible: newVisibility }
      }),
  }
})
