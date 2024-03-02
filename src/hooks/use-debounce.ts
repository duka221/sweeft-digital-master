import { useEffect, useState } from 'react'

export const useDebounce = (searchQuery: string) => {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 600)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  return [debouncedSearchQuery]
}
