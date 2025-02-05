import { mutate } from "swr";

const API_URL = "https://badfairy-strapi-j4rn9.ondigitalocean.app/api";

export async function getAllProducts() {
  const res = await fetch(`${API_URL}/products?populate=*`);
  if (!res.ok) {
    console.error("Error obteniendo productos");
    return [];
  }

  const { data } = await res.json();
  return data;
}

export async function getProductBySlug(slug: string) {
  // El slug debe ser unico ya que se espera que este fetch debe arrojar solo un resultado
  const res = await fetch(`${API_URL}/articles?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "max-age=600"
      }
    }
  );
  if (!res.ok) {
    console.error(`Error obteniendo producto con slug: ${slug}`);
    return null;
  }

  const json = await res.json();
  const data = json.data[0];
  mutate(`${API_URL}/articles?filters[slug][$eq]=${slug}&populate=*`, data, false);
  //console.log(data)
  return data;
}

