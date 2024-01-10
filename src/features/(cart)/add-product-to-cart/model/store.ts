import { create } from 'zustand'

type MovingProductState = {
  productId: string
  place: string
}

export const useMovingProductState = create<MovingProductState>((set) => ({
  productId: '',
  place: '',
}))
