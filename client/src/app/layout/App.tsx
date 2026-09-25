import { Outlet, ScrollRestoration } from "react-router-dom"
import Container from "@mui/material/Container"
import Navbar from "./Navbar"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useAppSelector } from "../store/store"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
      <ScrollRestoration />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
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