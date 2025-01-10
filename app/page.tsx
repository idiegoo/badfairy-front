'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle } from 'lucide-react'
import { Product } from './product'
import { getProducts } from './utils/getProducts'
import badfairyLogo from '../components/logo-badfairy.jpg'
import Image from 'next/image';
import { BadfairyLogoSVG } from '@/components/BadfairyLogoSVG'

const getFilteredAndSortedProducts = (products: Product[], categorySelected: string, sortBy: string) => {
  const filtered = categorySelected === 'todos'
    ? products
    : products.filter(product => product.category.name === categorySelected);

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
  const [categorySelected, setCategorySelected] = useState<string>('todos')
  const [sortBy, setSortBy] = useState<string>('default')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await getProducts()
      setProducts(productsData)
      setLoading(false)
    }
    loadProducts()
  }, [])

  const categories = ['todos', ...Array.from(new Set(products.map(p => p.category.name)))
  .sort((a, b) => a.localeCompare(b))
  ] //orden alfabetico de categorias, pero la primera siempre es 'todos'

  const filteredProducts = getFilteredAndSortedProducts(products, categorySelected, sortBy);

  const contactWsp = (product: Product) => {
    const msg = encodeURIComponent(`Hola!, estoy interesado en el producto: ${product.title}`)
    window.open(`https://wa.me/1234567890?text=${msg}`, '_blank')
  }

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-2">
        <BadfairyLogoSVG className='w-40 h-40' />
      </div>
      <p className='text-xl text-center mb-2'>Categoría</p>
      <div className="flex justify-center space-x-2 mb-8">
        
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setCategorySelected(category)}
            variant={categorySelected === category ? "default" : "outline"}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>
      <div className='mb-4'>
        {/*<h1 className="text-3xl font-bold text-center mb-2">Catálogo web Badfairy</h1>*/}
        {/* Filtrar por precio ascendente o descendente o por defecto */}
        <div className='w-full mb-2'>
          <label htmlFor="sortBy" className="text-md">Ordenar por: </label>
          <select id="sortBy" defaultValue="default" className="p-1 md:p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-400 focus:border-pink-400"
            onChange={e => setSortBy(e.target.value)}>
            <option value="asc" className='bg-pink-400'>Precio ascendente</option>
            <option value="desc" className='bg-pink-400'>Precio descendente</option>
            <option value="default" className='bg-pink-400'>Defecto</option>
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
                <Badge variant="secondary">{product.category.name}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="w-full aspect-square mb-4 overflow-hidden rounded-md">
                <Image
                  src={product.img}
                  alt={product.title}
                  height={300}
                  width={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="text-2xl font-bold">${product.price}</p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-black"
                //onClick={() => contactWsp(product)}
                onClick={() => contactIg()}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Contactar a Instagram
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}