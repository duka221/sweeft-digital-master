import { Image, getImages, getPopularImages } from 'api/images'
import { keys } from 'api/keys'
import { ImageList } from 'components/image-list'
import { useDebounce } from 'hooks/use-debounce'
import { useInfiniteScroll } from 'hooks/use-infinite-scroll'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import 'styles/Home/styles.css'

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery)
  const [fetchedImages, setFetchedImages] = useState<Array<Image>>([])
  const [fetchedSearch, setFetchedSearch] = useState<Array<Image>>([])
  const {page, setPage} = useInfiniteScroll()
  useQuery(keys.images.popular(page), () => getPopularImages(page), {
    enabled: debouncedSearchQuery === '',
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    onSuccess: images => setFetchedImages(prev => [...prev, ...images])
  })

  const {page: searchPage,setPage: setSearchPage} = useInfiniteScroll()
  const {
    data: images,
    isLoading,
    error,
    isSuccess
  } = useQuery(keys.images.list(debouncedSearchQuery, searchPage), () =>
    getImages({ debouncedSearchQuery, page: searchPage }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: images => {
        setFetchedSearch([])

        setFetchedSearch(prev => [...prev, ...images])}
    } 
  )

  useEffect(() => {
    if (isSuccess && images.length > 0 && debouncedSearchQuery !== '') {
      const prevSearchedHistory = JSON.parse(localStorage.getItem('searched-keys') ?? "[]")
      setFetchedImages([])
      setPage(1)
      localStorage.setItem(
        'searched-keys',
        JSON.stringify([...new Set([
          ...(prevSearchedHistory),
          debouncedSearchQuery
        ])])
      )
    }
    if (debouncedSearchQuery === ""){
        setFetchedSearch([])
        setSearchPage(1)
    }
  }, [debouncedSearchQuery, images, isSuccess])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>


  return (
    <div className='home-page'>
      <h1>Most Popular Images</h1>
      <div className='search-container'>
      <input
        type='text'
        placeholder='Search images by description'
        value={searchQuery}
        onChange={event => {
          setSearchQuery(event.target.value)
        }}
      />
      </div>
      <ImageList images={debouncedSearchQuery ? fetchedSearch ?? [] : fetchedImages ?? []} />
    </div>
  )
}
