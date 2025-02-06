"use client"

import Image from "next/image"
import type { GallerySession } from "../gallery"

interface DesktopMosaicProps {
  session: GallerySession
  onPhotoClick: (imageUrl: string) => void
}

export function DesktopMosaic({ session, onPhotoClick }: DesktopMosaicProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {session.images.map((image, index) => (
        <div key={index} className="relative aspect-square cursor-pointer" onClick={() => onPhotoClick(image.url)}>
          <Image
            unoptimized
            src={image.formats.small[0] || image.url}
            alt={`${session.sessionName} - Image ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  )
}

