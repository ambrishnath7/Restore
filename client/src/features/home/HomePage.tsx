import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <Box
      sx={{
        maxWidth: "xl",
        mx: "auto",
        px: 4,
        position: "relative"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <Box
          component="img"
          src="/images/products/sb-ang1.png"
          alt="ski resort image"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "16px",
            zIndex: 0
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 8,
            alignItems: "center",
            position: "relative",
            borderRadius: 4
          }}
        >
          <Typography
            variant="h1"
            color="white"
            fontWeight="bold"
            textAlign="center"
            sx={{ my: 3, zIndex: 1 }}
          >
            Welcome to Restore!
          </Typography>

          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/catalog"
            sx={{
              mt: 8,
              backgroundImage:
                "linear-gradient(to right, #2563EB, #06B6D4)",
              fontWeight: "bold",
              color: "white",
              borderRadius: "16px",
              px: 8,
              py: 2,
              border: "2px solid transparent",
              zIndex: 1
            }}
          >
            Go to shop
          </Button>
        </Box>
      </Box>
    </Box>
  )
}