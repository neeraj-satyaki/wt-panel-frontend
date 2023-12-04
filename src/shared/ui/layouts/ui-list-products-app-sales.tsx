import { ReactNode } from 'react'

export function UiListAppSales({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 744:grid-cols-2 1024:grid-cols-3">
      {children}
    </div>
  )
}
