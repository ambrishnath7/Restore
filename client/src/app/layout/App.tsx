import { useState } from "react"
import { Outlet } from "react-router-dom"
import Container from "@mui/material/Container"
import Navbar from "./Navbar"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

function App() {
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
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App