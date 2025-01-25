export const getCategories = async (url:string): Promise<string[]> => {
  const response = await fetch(url,{
    method: 'GET',
    headers:{
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "max-age=600"
    }
  }).then(resp => resp.json())
    .catch(err => console.error(err))

    const categories = response.data
      .map((category: { name: string }) => category.name) // Asegurarse de extraer `name`
      .sort((a: string, b: string) => a.localeCompare(b)); // Ordenar alfabéticamente
  //console.log("dataaa:", categories)
  return categories
}
