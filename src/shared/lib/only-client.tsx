import { useEffect, useState } from 'react'

export const OnlyClient = () => {
  const [client, setClient] = useState(false)
  useEffect(() => {
    setClient(true)
  }, [])

  return { client }
}
