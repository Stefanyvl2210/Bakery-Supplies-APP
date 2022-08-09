import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";

import Logo from "../../assets/images/header-logo.png";
import LogoMobile from "../../assets/images/logo-mobile.svg";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { cartQtySelector } from "../../features/counter/counterSlice";

export default function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const userIsLogged = localStorage.getItem("userLogged");
  const anchorRef = React.useRef(null);
  const cartQty = useSelector(cartQtySelector);

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
    localStorage.removeItem("userLogged");
    navigate("/");
  };

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
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
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
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              margin: "0 10px 0 0 !important",
              display: { xs: "flex", md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={LogoMobile}
            alt="logo mobile"
            onClick={() => navigate("/")}
          />
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <img src={Logo} alt="logo" />
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ margin: "0 !important" }}
            onClick={() => navigate("/cart")}
          >
            <Badge badgeContent={cartQty} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
          {userIsLogged && (
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              sx={{ margin: "0 !important" }}
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
          )}
          {!userIsLogged && (
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              sx={{ margin: "0 !important" }}
            >
              <LoginIcon onClick={() => navigate("/login")} />
            </IconButton>
          )}
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
          }}
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
              location.state.category ==+ "dessert"
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
              location.state.category === "utensils-and-ingredients"
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
            <Badge badgeContent={cartQty} color="primary">
              Cart
            </Badge>
          </Button>
          {userIsLogged && (
            <>
              <Button
                color="inherit"
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={
                  location.pathname === "/my-account" ? classes.underlined : ""
                }
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
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper
                      sx={{
                        border: 2.5,
                        bgcolor: "#F5EEE6",
                        borderColor: "#C86B85",
                        color: "#4E4E4E",
                        marginTop: "19px",
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                          sx={{
                            padding: 0,
                            paddingTop: "7px",
                            paddingBottom: "7px",
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              navigate("/my-account");
                              setOpen(false);
                            }}
                            sx={{
                              paddingTop: "7px",
                              paddingBottom: "7px",
                              paddingLeft: "20px",
                              paddingRight: "20px",
                              fontFamily: "Open Sans",
                              fontSize: 16,
                            }}
                          >
                            My profile
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setOpen(false);
                            }}
                            sx={{
                              paddingTop: "7px",
                              paddingBottom: "7px",
                              paddingLeft: "20px",
                              paddingRight: "20px",
                              fontFamily: "Open Sans",
                              fontSize: 16,
                            }}
                          >
                            Orders
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setOpen(false);
                            }}
                            sx={{
                              paddingTop: "7px",
                              paddingBottom: "7px",
                              paddingLeft: "20px",
                              paddingRight: "20px",
                              fontFamily: "Open Sans",
                              fontSize: 16,
                            }}
                          >
                            Payments
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <LogoutIcon
                className={classes.logButton}
                onClick={handleLogout}
              />
            </>
          )}
          {!userIsLogged && (
            <LoginIcon
              className={classes.logButton}
              onClick={() => navigate("/login")}
            />
          )}
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
    margin: "0 15px",
  },
}));
