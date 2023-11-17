import { ReactNode } from 'react'

export function UiListProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 1024:grid-cols-3 744:grid-cols-5 1280:grid-cols-6 gap-4 w-full 1512:grid-cols-12">
      {children}
    </div>
  )
}
