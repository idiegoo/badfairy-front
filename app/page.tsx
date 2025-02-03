"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from 'lucide-react'
import { Product } from "./utils/product"
import { getProducts } from './utils/getProducts'
import { getCategories } from './utils/getCategories'
import Image, { StaticImageData } from 'next/image';
import { BadfairyLogoSVG } from '@/components/BadfairyLogoSVG'
import useSWR from 'swr'
import {
  Pantrucata1, PantrucataCollarLentes, PantrucataCollarLentes2, CollarCruz
} from '@/app/images/home-carrousel/index'
import { getFilteredAndSortedProducts } from "./utils/getFilteredAndSortedProducts"

const API_URL = "https://badfairy-strapi-j4rn9.ondigitalocean.app/api"

const mobile_images = [
  Pantrucata1, PantrucataCollarLentes, PantrucataCollarLentes2, CollarCruz
]

const desktop_images = [
  CollarCruz, PantrucataCollarLentes, PantrucataCollarLentes2
]

export default function Catalogo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [categorySelected, setCategorySelected] = useState<string>('todos');
  const [sortBy, setSortBy] = useState('default');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loopImages, setLoopImages] = useState<StaticImageData[]>(mobile_images)

  const { data: products, isLoading: isLoading } = useSWR(
    `${API_URL}/articles?populate=*&pagination[start]=0&pagination[limit]=1000`,
    getProducts, {
      revalidateOnFocus: false,
      dedupingInterval: 600000, // 10 min
  })

  const { data: categories } = useSWR(`${API_URL}/categories`, getCategories,{
    revalidateOnFocus: false,
    dedupingInterval: 600000, // 10 min
  })

  useEffect(() => {
    if (products && categories) {
      setFilteredProducts(getFilteredAndSortedProducts(products, categorySelected, sortBy));
    }
    setLoopImages((window.innerWidth > 640) ? desktop_images : mobile_images) // 640px = sm
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % loopImages.length);
    }, 5000); // Cambia la imagen cada 5 segundos
    return () => clearInterval(interval);
  }, [loopImages, products, categorySelected, sortBy, categories]);

  const contactIg = () => {
    window.open('https://ig.me/m/badfairy.cl', '_blank')
  }

  if (isLoading) {
    return (
      <div className='flex h-screen justify-center items-center'>
        <BadfairyLogoSVG className="animate-pulse" height={300} width={300} fill="black" />
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 fade-in">
      <div className="relative w-full h-48 md:h-80 overflow-hidden rounded-xl mb-6">
        {/* Carrusel de imágenes */}
        <div
          className="-z-10 absolute inset-0 flex transition-transform duration-1000 ease-in-out w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)`}}
        >
          {loopImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full relative">
              <Image
                src={image}
                quality={100}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
      </div>
      {/* Logo y título */}
      <div className="z-10 sunglassEffect h-full flex justify-center mb-2">
        <BadfairyLogoSVG className="w-40 h-40 self-center opacity-90" fill="white" />
      </div>
    </div>
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center space-x-2 mb-8 flex-wrap">
        <Button
          className='mb-1'
          key={"todos"}
          onClick={() => setCategorySelected("todos")}
          variant={categorySelected === "todos" ? "default" : "outline"}
          >
            Todos
        </Button>
        {categories?.map((category) => (
          <Button
            className='mb-1'
            key={category}
            onClick={() => setCategorySelected(category)}
            variant={categorySelected === category ? "default" : "outline"}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))
        }
      </div>
    </div>
    <div className='mb-4'>
      {/* Filtrar por precio ascendente o descendente o por defecto */}
      <div className='w-full mb-2'>
        <label htmlFor="sortBy" className="text-md">Ordenar por: </label>
        <select id="sortBy" defaultValue="default" className="p-1 md:p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          onChange={e => setSortBy(e.target.value)}>
          <option value="asc">Precio ascendente</option>
          <option value="desc">Precio descendente</option>
          <option value="default">Defecto</option>
        </select>
      </div>
      <p className="text-center text-sm text-gray-600">
        {filteredProducts.length === 1 ? "1 producto encontrado" : filteredProducts.length + " productos encontrados"}
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="z-10 flex justify-between items-center text-xl font-bold">
              {product.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="w-full aspect-square mb-4 overflow-hidden rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
              <Image
                unoptimized
                src={product.img}
                alt={product.title}
                quality={100}
                height={300}
                width={300}
                className="object-cover w-full h-full fade-in"
              />
            </div>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className={`text-2xl font-bold`}>
              {
                new Intl.NumberFormat('es-CL', {currency: "CLP", style: "currency"})
                .format(product.price)// Precio formateado a moneda chilena
              }
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full h-12 bg-black transition ease-in-out delay-150 hover:scale-105 duration-100 hover:bg-black"
              onClick={() => contactIg()}
            >
              <MessageCircle className="mr-2 h-4 w-4 animate-bounce" />
              Contactar a Instagram
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>

    </main>
  )
}