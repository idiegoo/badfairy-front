export interface Product {
  id: number
  title: string
  description: string
  price: number
  cover: {
    formats:{
      small: {
        url: string
      }
      medium: {
        url: string
      }
      thumbnail: {
        url: string
      }
    }
    url: string
  }
  img: string
  morePhotos: {
    url: string
  }[]
  categories: {
    name: string
  }[],
  documentId: string
}