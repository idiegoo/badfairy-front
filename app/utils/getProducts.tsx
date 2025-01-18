import { Product } from "../product"

const API_URL = process.env.API_URL || "http://localhost:1337/api" //URL strapi

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/articles?populate=*`).then(resp => resp.json())
    .catch(err => console.error(err))
  console.log("response:", response.data)
  const products = response.data.map((product: Product) => (
      //alternar img dependiendo del tamano del dispositivo del user
      {
        id: product.id,
        title: product.title,
        desc: product.description,
        price: product.price,
        img: product.cover.formats.medium?.url || product.cover.url, // Aplica img medium si existe, sino la default
        categories: product.categories.map((category) => category.name)
      }
    )
  )
  console.log("data:", products)
  return products
}
