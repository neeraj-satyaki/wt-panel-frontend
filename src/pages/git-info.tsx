import { useEffect, useState } from 'react'

export function GitInfoPage() {
  const [onlyClient, setOnlyClient] = useState(false)

  useEffect(() => {
    setOnlyClient(true)
  }, [])
  if (!onlyClient) return

  return (
    <main>
      <div className="p-4">{process.env.GIT_INFO}</div>
    </main>
  )
}
