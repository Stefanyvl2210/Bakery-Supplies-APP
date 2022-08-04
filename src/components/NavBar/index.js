import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

import Logo from "../../assets/images/header-logo.png";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";

export default function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const userIsLogged = localStorage.getItem('userLogged');
  const anchorRef = React.useRef(null);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userLogged');
    navigate('/');
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <AppBar position="static" className={classes.container}>
      <Toolbar className={classes.toolbar}>
        <div>
          <img src={Logo} alt="logo" />
        </div>

        <Box
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: 'flex-end'}}
          className={classes.menuItems}
        >
          <Button
            color="inherit"
            className={location.pathname === "/" ? classes.underlined : ""}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            color="inherit"
            className={
              location.pathname === "/products" &&
              location.state.category == "dessert"
                ? classes.underlined
                : ""
            }
            onClick={() =>
              navigate("/products", {
                state: {
                  category: "dessert",
                  title: "Desserts",
                },
              })
            }
          >
            Desserts
          </Button>
          <Button
            color="inherit"
            className={
              location.pathname === "/products" &&
              location.state.category == "utensils-and-ingredients"
                ? classes.underlined
                : ""
            }
            onClick={() =>
              navigate("/products", {
                state: {
                  category: "utensils-and-ingredients",
                  title: "Utensils and Ingredients",
                },
              })
            }
          >
            Utensils & ingredients
          </Button>
          <Button
            color="inherit"
            className={location.pathname === "/cart" ? classes.underlined : ""}
            onClick={() => navigate("/cart")}
          >
            Cart
          </Button>
          { userIsLogged &&
            <>
              <Button
                color="inherit"
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={location.pathname === "/my-account" ? classes.underlined : ""}
                // onClick={() => navigate("/my-account")}
              >
                Account
                <ExpandMoreIcon fontSize="small" />
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>Profile</MenuItem>
                          <MenuItem onClick={handleClose}>Orders</MenuItem>
                          <MenuItem onClick={handleClose}>Payments</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <LogoutIcon className={classes.logButton} onClick={handleLogout} />
            </>
          }
          { !userIsLogged &&
            <LoginIcon className={classes.logButton} onClick={() => navigate("/login")} />
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  underlined: {
    borderRadius: "4px 4px 0px 0px !important",
    paddingBottom: "4px !important",
    borderBottom: "2px solid #4E4E4E !important",
  },
  container: {
    boxShadow: "none !important",
    backgroundColor: "#E6A4B4 !important",
  },
  toolbar: {
    minHeight: "80px !important",
    display: "flex !important",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#4E4E4E",

    "& button": {
      margin: " 0 7px",
      fontWeight: "600 !important",
      fontSize: "16px !important",
    },
  },
  menuItems: {
    display: "flex",
    alignItems: "center",
  },
  logButton: {
    cursor: "pointer",
    margin: "0 15px"
  }
}));
