import type { Product } from "../../app/models/product"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { useAddBasketItemMutation } from "../basket/basketApi"

type Props = {
  product: Product
}

function ProductCard({ product }: Props) {
  const [addBasketItem, { isLoading }] = useAddBasketItemMutation()

  return (
    <Card elevation={3} sx={{ width: 280, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        sx={{ height: 240, backgroundSize: 'cover' }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle2" sx={{ color: 'secondary.main' }}>
          {product.name}
        </Typography>
        <Typography variant="h6" sx={{ textTransform: 'uppercase', color: 'secondary.main' }}>
          ${(product.price / 100).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          disabled={isLoading}
          onClick={() => addBasketItem({ product, quantity: 1 })}
        >
          Add to cart
        </Button>
        <Button component={Link} to={`/catalog/${product.id}`}>View</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard