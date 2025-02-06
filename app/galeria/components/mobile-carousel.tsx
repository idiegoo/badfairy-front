"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { GallerySession } from "../gallery"

interface MobileCarouselProps {
  session: GallerySession
  onPhotoClick: (imageUrl: string) => void
}

export function MobileCarousel({ session, onPhotoClick }: MobileCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {session.images.map((image, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <div className="relative w-full h-[50vh] cursor-pointer" onClick={() => onPhotoClick(image.url)}>
              <Image
                unoptimized
                src={image.formats.medium[0] || image.url}
                alt={`Image ${index + 1}`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

