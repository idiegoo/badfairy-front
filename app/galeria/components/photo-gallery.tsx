"use client"

import { useState } from "react"
import { MobileCarousel } from "./mobile-carousel"
import { DesktopMosaic } from "./desktop-mosaic"
import { FullScreenModal } from "./full-screen-modal"
import type { GalleryProps } from "../gallery"

export function PhotoGallery({ session }: GalleryProps) {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)

  const handlePhotoClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl)
  }

  const handleCloseModal = () => {
    setSelectedImageUrl(null)
  }

  return (
    <div>
      <div className="text-center">
        {session.date && <p className="mb-3">Fecha: {session.date}</p>}
        <p className="mb-2 font-bold text-lg">Créditos</p>
        <p className="mb-4 whitespace-pre-wrap md:hidden">{session.credits}</p>
      </div>
      <div className="hidden md:block text-center">
    <p className="mb-4">
      {session.credits.split("\n").map((credit, index, array) => (
        <span key={index}>
          {credit}
          <span key={"span-" + index} className="font-bold mx-2">
            {index < array.length - 1 && " ♦ "}
          </span>
        </span>
      ))}
    </p>
  </div>
      <div className="md:hidden">
        <MobileCarousel session={session} onPhotoClick={handlePhotoClick} />
      </div>
      <div className="hidden md:block">
        <DesktopMosaic session={session} onPhotoClick={handlePhotoClick} />
      </div>
      <FullScreenModal
        imageUrl={selectedImageUrl}
        isOpen={!!selectedImageUrl}
        onClose={handleCloseModal}
        alt={`${session.sessionName} - Full size image`}
      />
    </div>
  )
}

