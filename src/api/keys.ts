export const keys = {
  images: {
    popular:(page: number) => ['popular',page],
    detail:(id: string) => ['detail',id],
    list: (search: string , page: number) => ['search', search,page],
    history: (search: string , page: number) => ['search-history', search,page]

  }
}
