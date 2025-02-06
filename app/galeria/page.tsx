"use client"
import { useEffect, useState } from "react"
import { getGalleryPhotos } from "@/lib/api"
import type { GallerySession } from "./gallery"
import { PhotoGallery } from "./components/photo-gallery"

export default function GalleryHome() {
  const [photos, setPhotos] = useState< GallerySession | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      // Seleccionando la sesion actual
      const data = await getGalleryPhotos("n1");
      setPhotos(data);
    }
    fetchPhotos();
  }, []);

  return (
    <main className="container mx-auto py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3">Galería de fotos</h1>
      </div>
      {photos && <PhotoGallery session={photos} />}
    </main>
  )
}