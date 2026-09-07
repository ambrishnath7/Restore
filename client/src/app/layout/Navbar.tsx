import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import DarkMode from "@mui/icons-material/DarkMode"
import LightMode from "@mui/icons-material/LightMode"

type Props = {
  darkMode: boolean
  toggleDarkMode: () => void
}

function Navbar({ darkMode, toggleDarkMode }: Props) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">RESTORE</Typography>
        <IconButton onClick={toggleDarkMode}>
          {darkMode ? (
            <DarkMode />
          ) : (
            <LightMode sx={{ color: 'yellow' }} />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar