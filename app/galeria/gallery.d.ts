export interface GallerySession {
  documentId: string
  sessionName: string
  credits: string
  date?: string
  images: {
    url: string
    formats: {
      large: string[]
      medium: string[]
      small: string[]
    }
  }[]
}

export interface GalleryProps {
  session: GallerySession
}