const API_URL = process.env.API_URL || "http://localhost:1337/api" //URL strapi

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories?populate=*`).then(resp => resp.json())
    .catch(err => console.error(err))

    const categories = response.data
      .map((category: { name: string }) => category.name) // Asegurarse de extraer `name`
      .sort((a: string, b: string) => a.localeCompare(b)); // Ordenar alfabéticamente
  console.log("dataaa:", categories)
  return categories
}
