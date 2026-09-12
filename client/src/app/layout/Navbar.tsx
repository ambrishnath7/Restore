import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import DarkMode from "@mui/icons-material/DarkMode"
import LightMode from "@mui/icons-material/LightMode"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Badge from "@mui/material/Badge"
import ShoppingCart from "@mui/icons-material/ShoppingCart"
import Box from "@mui/material/Box"
import { NavLink } from "react-router-dom"

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
]

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
]

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: '#baecf9'
  }
}

type Props = {
  darkMode: boolean
  toggleDarkMode: () => void
}

function Navbar({ darkMode, toggleDarkMode }: Props) {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={navStyles}
          >
            RESTORE
          </Typography>
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? (
              <DarkMode />
            ) : (
              <LightMode sx={{ color: 'yellow' }} />
            )}
          </IconButton>
        </Box>

        <List sx={{ display: 'flex' }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="large" sx={{ color: 'inherit' }}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: 'flex' }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar