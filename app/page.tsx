'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle } from 'lucide-react'
import { Product } from './product'
import { getProducts } from './utils/getProducts'
import { getCategories } from './utils/getCategories'
import badfairyLogo from '../components/logo-badfairy.jpg'
import Image from 'next/image';
import { BadfairyLogoSVG } from '@/components/BadfairyLogoSVG'
import { Playfair_Display } from 'next/font/google'

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  display: "swap",
  style: ["normal", "italic"],
  })

const getFilteredAndSortedProducts = (products: Product[], categorySelected: string, sortBy: string) => {
  const filtered = categorySelected === 'todos'
    ? products
    // Solo se muestra si el producto esta en alguna de las categorias seleccionadas
    : products.filter(product =>
      product.categories.some(category => category.toString() === categorySelected) // Utilizamos `some` en lugar de `forEach`
    );

  // Con slice antes de sort evitamos mutar el array original para que funcione el sort por default
  if (sortBy === 'asc') {
    return filtered.slice().sort((a, b) => a.price - b.price);
  } else if (sortBy === 'desc') {
    return filtered.slice().sort((a, b) => b.price - a.price);
  }
  else return filtered
};

export default function Catalogo() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [categorySelected, setCategorySelected] = useState<string>('todos')
  const [sortBy, setSortBy] = useState<string>('default')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await getProducts()
      // Obtener categorías únicas
      const categories = await getCategories()
      setProducts(productsData)
      setCategories(['todos', ...categories])
      setLoading(false)
    }
    loadProducts()
  }, [])

  const filteredProducts = getFilteredAndSortedProducts(products, categorySelected, sortBy);

  /* Deprecated by Instagram contact preference
  const contactWsp = (product: Product) => {
    const msg = encodeURIComponent(`Hola!, estoy interesado en el producto: ${product.title}`)
    window.open(`https://wa.me/1234567890?text=${msg}`, '_blank')
  }
  */

  const contactIg = () => {
    window.open('https://ig.me/m/badfairy.cl', '_blank')
  }

  if (loading) {
    return (
      <div className='flex h-screen justify-center items-center'>
        <Image src={badfairyLogo} width={300} height={300} alt='' className='animate-pulse'/>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <div className="flex justify-center mb-2">
        <BadfairyLogoSVG className='w-40 h-40' />
      </div>
      <h1 className={`text-6xl font-bold text-center mb-7 ${playfair_display.className} antialiased`}>
        Catálogo web
      </h1>
      <div className="flex justify-center space-x-2 mb-8 flex-wrap">

        {categories.map((category) => (
          <Button
            className='mb-1'
            key={category}
            onClick={() => setCategorySelected(category)}
            variant={categorySelected === category ? "default" : "outline"}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>
      <div className='mb-4'>
        {/* Filtrar por precio ascendente o descendente o por defecto */}
        <div className='w-full mb-2'>
          <label htmlFor="sortBy" className="text-md">Ordenar por: </label>
          <select id="sortBy" defaultValue="default" className="p-1 md:p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 font-bold"
            onChange={e => setSortBy(e.target.value)}>
            <option value="asc">Precio <span className='font-bold'>ascendente</span></option>
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
              <CardTitle className="flex justify-between items-center text-xl">
                {product.title}
                <div className='flex justify-end space-x-2'>
                {
                  product.categories.map(category => (
                    <Badge key={category.toString()} variant="secondary">{category.toString()}</Badge>
                  ))
                }
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="w-full aspect-square mb-4 overflow-hidden rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <Image
                  src={product.img}
                  alt={product.title}
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
                className="w-full bg-black transition ease-in-out delay-150 hover:scale-105 duration-100 hover:bg-black"
                //onClick={() => contactWsp(product)}
                onClick={() => contactIg()}
              >
                <MessageCircle className="mr-2 h-4 w-4 animate-bounce" />
                Contactar a Instagram
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}