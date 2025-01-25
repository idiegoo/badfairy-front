export const getCategories = async (url:string): Promise<string[]> => {
  const response = await fetch(url).then(resp => resp.json())
    .catch(err => console.error(err))

    const categories = response.data
      .map((category: { name: string }) => category.name) // Asegurarse de extraer `name`
      .sort((a: string, b: string) => a.localeCompare(b)); // Ordenar alfabéticamente
  //console.log("dataaa:", categories)
  return categories
}
