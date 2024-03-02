import { PaginationResponse } from './globa'

export type Image = {
  id: string
  urls: { regular: string }
  alt_description: string
}
export type DetailedImage = {
  id: string
  urls: { regular: string }
  alt_description: string
  downloads: number
  likes: number
  views: number
}


type GetImagesInput = { debouncedSearchQuery: string, page: number }


export const getImage = async (id : string) => {
  const data = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/photos/${id}?client_id=${process.env.REACT_APP_ACCESS_KEY}`
  )
  const result = (await data.json()) as DetailedImage
  return result
}

export const getImages = async ({
  debouncedSearchQuery, page
}: GetImagesInput): Promise<Array<Image>> => {
  const data = await fetch(
    `${
      process.env.REACT_APP_SERVER_URL
    }/search/photos?query=${encodeURIComponent(
      debouncedSearchQuery
    )}&per_page=20&page=${page}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
  )

  const result = (await data.json()) as {
    results: Array<Image>
  } & PaginationResponse

  return result.results
}

export const getPopularImages = async (page: number): Promise<Array<Image>> => {
  const data = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/search/photos?query=''&order_by=popular&page=${page}&per_page=20&client_id=${process.env.REACT_APP_ACCESS_KEY}`
  )

  const result = (await data.json()) as {
    results: Array<Image>
  } & PaginationResponse

  return result.results
}

