"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import Image from "next/image"

interface FullScreenModalProps {
  imageUrl: string | null
  isOpen: boolean
  onClose: () => void
  alt: string
}

export function FullScreenModal({ imageUrl, isOpen, onClose, alt }: FullScreenModalProps) {
  if (!imageUrl) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-full p-0">
        <DialogTitle className="sr-only"></DialogTitle>
        <div className="relative w-screen h-screen">
          {/* Si el dispositivo es mas grande que una tablet, se cierra la imagen al clickearla */}
          <div onClick={() => {
            if (window.outerWidth > 768) {
              onClose()
            }
          }}>
            <Image src={imageUrl || "/placeholder.svg"} alt={alt} fill style={{ objectFit: "contain" }}/>
          </div>
          <DialogFooter className="absolute bottom-0 left-0 right-0 px-4 bg-white pb-8 md:hidden">
            <DialogClose asChild>
              <Button type="button">
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

