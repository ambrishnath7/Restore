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
import LinearProgress from "@mui/material/LinearProgress"
import { NavLink, Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/store"
import { toggleDarkMode } from "./uiSlice"
import { useFetchBasketQuery } from "../../features/basket/basketApi"
import { useUserInfoQuery } from "../../features/accounts/accountApi"
import UserMenu from "./UserMenu"

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

function Navbar() {
  const { isLoading, darkMode } = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()
  const { data: basket } = useFetchBasketQuery()
  const { data: user } = useUserInfoQuery()

  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0

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
          <IconButton onClick={() => dispatch(toggleDarkMode())}>
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
          <IconButton component={Link} to="/basket" size="large" sx={{ color: 'inherit' }}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {user ? (
            <UserMenu user={user} />
          ) : (
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
          )}
        </Box>
      </Toolbar>

      {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </AppBar>
  )
}

export default Navbar