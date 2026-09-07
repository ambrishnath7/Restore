import type { Product } from "../../app/models/product"
import Box from "@mui/material/Box"
import ProductCard from "./ProductCard"

type Props = {
  products: Product[]
}

function ProductList({ products }: Props) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  )
}

export default ProductList