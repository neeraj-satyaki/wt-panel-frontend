import { useEffect, useState } from 'react'

export function useChangeBlock() {
  const [currentBlock, setCurrentBlock] = useState<number>(1)

  return {
    currentBlock,
    setCurrentBlock,
  }
}

export function useLocalStorage() {
  const [learnStatus, setLearnStatus] = useState<string | null>()
  const [getLocal, setGetLocal] = useState<boolean>(false)

  const endLearn = () => {
    localStorage.setItem('learn_panel', 'false')
    setLearnStatus('false')
  }

  useEffect(() => {
    setLearnStatus(localStorage.getItem('learn_panel'))
    setGetLocal(true)
  }, [])

  return {
    endLearn,
    learnStatus,
    getLocal,
  }
}
