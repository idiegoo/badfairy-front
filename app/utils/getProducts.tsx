import { mutate } from "swr"
import { Product } from "./product"

export const getProducts = async (url: string): Promise<Product[]> => {
  const response = await fetch(url, {
    headers:{
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "max-age=600"
    }
  }).then(resp => resp.json())
    .catch(err => console.error(err))
  //console.log("response:", response.data)
  const products = response.data.map((product: Product) => (
      //alternar img dependiendo del tamano del dispositivo del user
      {
        id: product.id,
        documentId: product.documentId,
        slug: product.slug,
        title: product.title,
        desc: product.description,
        price: product.price,
        img: product.cover.formats.medium?.url || product.cover.url, // Aplica img medium si existe, sino la default
        morePhotos: product.morePhotos?.map((photo) => photo.url) || null, // Muestra mas fotos solo si existen
        categories: product.categories.map((category) => category.name)
      }
    )
  )
  mutate(url, products, false) // Actualiza el cache de SWR con solo los que faltan
  //console.log("data:", products)
  return products
}
