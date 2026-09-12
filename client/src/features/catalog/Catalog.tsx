import { useState, useEffect } from "react"
import type { Product } from "../../app/models/product"
import ProductList from "./ProductList"

function Catalog() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://localhost:5004/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <ProductList products={products} />
  )
}

export default Catalog