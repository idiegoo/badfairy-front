"use client"
import Link from "next/link"
import { Instagram, Menu, X } from "lucide-react"
import { useState } from "react"
import { BadfairyLogoSVG } from "@/components/BadfairyLogoSVG"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black text-white py-1 md:px-6 sticky top-0 z-50">
      <div className="container mx-auto flex flex-row justify-between items-center px-6">
        {/* Desktop View - Left Side */}
        <nav className="hidden md:flex space-x-4 basis-1/3">
          <Link href="/galeria" className="hover:text-gray-300">
            Galería
          </Link>
          <Link href="/" className="hover:text-gray-300">
            Catálogo
          </Link>
        </nav>

        {/* Logo - Centered */}
        <div className="md:basis-1/3">
          <Link href="/">
            <BadfairyLogoSVG className="h-12 w-12 md:w-16 md:h-16" fill="white" />
          </Link>
        </div>

        {/* Desktop View - Right Side */}
        <div className="hidden md:block">
          <a href="https://www.instagram.com/badfairy.cl" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 hover:text-gray-300" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu - Sliding from right */}
      <div
        className={`fixed top-0 right-0 h-full w-60 bg-black transform transition-transform duration-300 ease-in-out z-10 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <nav className="flex flex-col items-center h-full space-y-8 pt-24 z-50">
          <Link href="/" className="text-lg hover:text-gray-300">
            Catálogo
          </Link>
          <Link href="/galeria" className="text-lg hover:text-gray-300">
            Galería
          </Link>
          <a
            href="https://www.instagram.com/badfairy.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-lg hover:text-gray-300"
          >
            Instagram <Instagram className="w-5 h-5 ml-2" />
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header

