export interface Product {
  id: number
  slug: string
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

export interface Photo {
  url: string
  name: string
  width: number
  height: number
}