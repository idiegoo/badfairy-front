import { Product } from "./product";


export const getFilteredAndSortedProducts = (products: Product[], categorySelected: string, sortBy: string) => {
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