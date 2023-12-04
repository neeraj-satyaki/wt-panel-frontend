import { ReactNode } from 'react'

export function UiListProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-2 744:grid-cols-3 1024:grid-cols-4 1280:grid-cols-5 1512:grid-cols-6">
      {children}
    </div>
  )
}
