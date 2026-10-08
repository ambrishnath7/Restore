import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/store/store"
import { useFetchProductsQuery } from "../catalog/catalogApi"
import ProductCard from "../catalog/ProductCard"
import type { Product } from "../../app/models/product"

type RowProps = {
  title: string
  products: Product[] | undefined
}

function ProductRow({ title, products }: RowProps) {
  if (!products || products.length === 0) return null

  return (
    <Box sx={{ mt: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Button component={Link} to="/catalog">
          See all
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          overflowX: "auto",
          pb: 2,
        }}
      >
        {products.map((product) => (
          <Box key={product.id} sx={{ flexShrink: 0 }}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default function HomePage() {
  const baseParams = useAppSelector((state) => state.catalog)

  const { data: topPicks } = useFetchProductsQuery({
    ...baseParams,
    pageNumber: 1,
    pageSize: 8,
    orderBy: "priceDesc",
    searchTerm: "",
    brands: [],
    types: [],
  })

  const { data: affordable } = useFetchProductsQuery({
    ...baseParams,
    pageNumber: 1,
    pageSize: 20,
    orderBy: "price",
    searchTerm: "",
    brands: [],
    types: [],
  })

  const under50 = affordable?.items.filter((p) => p.price < 5000).slice(0, 8)

  return (
    <Box sx={{ maxWidth: "xl", mx: "auto", px: 4 }}>
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 420, md: 520 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="/images/products/sb-ang1.png"
          alt="Snowboard with bindings"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,18,40,0.55) 0%, rgba(10,18,40,0.85) 100%)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            p: { xs: 3, md: 8 },
          }}
        >
          <Typography
            variant="h2"
            color="white"
            fontWeight="bold"
            sx={{ mb: 2, fontSize: { xs: "2.2rem", md: "3.5rem" } }}
          >
            Gear for the mountain
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.85)", maxWidth: 560, mb: 5 }}
          >
            Boards, boots, gloves and hats. Free delivery on orders over $100.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/catalog"
              sx={{
                backgroundImage: "linear-gradient(to right, #2563EB, #06B6D4)",
                fontWeight: "bold",
                color: "white",
                borderRadius: "12px",
                px: 6,
                py: 1.5,
              }}
            >
              Shop now
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/catalog"
              sx={{
                color: "white",
                borderColor: "rgba(255,255,255,0.7)",
                borderRadius: "12px",
                px: 6,
                py: 1.5,
              }}
            >
              Browse catalog
            </Button>
          </Box>
        </Box>
      </Box>

      <ProductRow title="Top picks" products={topPicks?.items.slice(0, 8)} />
      <ProductRow title="Under $50" products={under50} />
    </Box>
  )
}