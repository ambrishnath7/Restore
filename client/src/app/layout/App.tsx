import { Outlet } from "react-router-dom"
import Container from "@mui/material/Container"
import Navbar from "./Navbar"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useAppSelector } from "../store/store"
import { ScrollRestoration } from "react-router-dom"

// ...inside the App component's JSX, wherever the router-level content is:
<ScrollRestoration />

function App() {
  const darkMode = useAppSelector(state => state.ui.darkMode)

  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
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