import type { Product } from "../../app/models/product"
import ProductList from "./ProductList"

type Props = {
  products: Product[]
}

function Catalog({ products }: Props) {
  return (
    <ProductList products={products} />
  )
}

export default Catalog