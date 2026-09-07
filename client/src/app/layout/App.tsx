import { useState, useEffect } from "react"
import type { Product } from "../models/product"
import Catalog from "../../features/catalog/Catalog"
import Container from "@mui/material/Container"
import Navbar from "./Navbar"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

function App() {
  const [products, setproducts] = useState<Product[]>([])
  const [darkMode, setDarkMode] = useState(true)

  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    fetch('https://localhost:5004/api/products')
      .then(response => response.json())
      .then(data => setproducts(data))
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Box
        sx={{
          minHeight: '100vh',
          background: paletteType === 'dark'
            ? 'radial-gradient(circle, #1e3aba, #111b27)'
            : 'radial-gradient(circle, #aecff9, #f0f9ff)',
          py: 6
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Catalog products={products} />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App