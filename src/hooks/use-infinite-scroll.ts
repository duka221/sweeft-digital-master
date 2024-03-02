import { useEffect, useState } from 'react'

export const useInfiniteScroll = (scrollContainer?: HTMLElement | null) => {
  const [page, setPage] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainer || document.documentElement

      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 20
      ) {
        setPage(prev => prev + 1)
      }
    }

    const container = scrollContainer || document
    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [scrollContainer, setPage])

  return { page, setPage }
}
