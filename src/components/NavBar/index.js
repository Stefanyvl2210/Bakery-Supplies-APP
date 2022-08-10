import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Logo from "../../assets/images/header-logo.png";
import LogoMobile from "../../assets/images/logo-mobile.svg";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  ClickAwayListener,
  Collapse,
  Drawer,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { cartQtySelector } from "../../features/counter/counterSlice";

const menuMobile = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Desserts",
    url: "/products",
  },
  {
    name: "Utensils and ingredients",
    url: "/products",
  },
];

export default function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const userIsLogged = localStorage.getItem("userLogged");
  const anchorRef = React.useRef(null);
  const cartQty = useSelector(cartQtySelector);

  const [openMenuMobile, setOpenMenuMobile] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openAccordion, setOpenAccordion] = React.useState(false);
  const [navMobile, setNavMobile] = React.useState(menuMobile);

  const handleDrawer = () => {
    setOpenMenuMobile(!openMenuMobile);
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

  const handleMobileNav = (item) => {
    setOpenMenuMobile(!openMenuMobile);

    if (item.name === "Desserts") {
      navigate(item.url, {
        state: {
          category: "dessert",
          title: "Desserts",
        },
      });
    } else if (item.name === "Utensils and ingredients") {
      navigate(item.url, {
        state: {
          category: "utensils-and-ingredients",
          title: "Utensils and ingredients",
        },
      });
    } else if (item.name === "Account") {
      setOpenAccordion(true);
    } else {
      navigate(item.url);
    }
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  React.useEffect(() => {
    if (userIsLogged) {
      navMobile.push({
        name: "Account",
        url: "/my-account",
      });
    } else if (!userIsLogged && navMobile.length > 3) {
      navMobile.pop();
    }
  }, [userIsLogged]);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <AppBar position="static" className={classes.container}>
        <Toolbar className={classes.toolbar}>
          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                margin: "0 10px 0 0 !important",
                display: { xs: "flex", md: "none" },
              }}
              onClick={handleDrawer}
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
            <img src={Logo} alt="logo" onClick={() => navigate("/")} />
          </Box>

          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
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
                onClick={() => navigate("/login")}
              >
                <LoginIcon />
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
                location.state.category === "dessert"
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
              className={
                location.pathname === "/cart" ? classes.underlined : ""
              }
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
                    location.pathname === "/my-account"
                      ? classes.underlined
                      : ""
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
                                navigate("/orders");
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
                                navigate("/payments");
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
      <Drawer
        sx={{
          width: "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "auto",
            top: "80px",
            background: "#F5EEE6",
            padding: "0 22px",
            border: "2px solid #C86B85",
          },
        }}
        variant="persistent"
        anchor="top"
        open={openMenuMobile}
      >
        <List>
          {navMobile.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                {item.name !== "Account" ? (
                  <ListItemText
                    primary={item.name}
                    onClick={() => handleMobileNav(item)}
                  />
                ) : (
                  <>
                    <ListItemText
                      primary="Account"
                      onClick={() => setOpenAccordion((prev) => !prev)}
                    />
                    {openAccordion ? <ExpandLess /> : <ExpandMore />}
                  </>
                )}
              </ListItemButton>
            </ListItem>
          ))}

          <Collapse in={openAccordion} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/my-account" className={classes.link} onClick={() => setOpenMenuMobile(!openMenuMobile)} >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </Link>
              <Link to="/orders" className={classes.link} onClick={() => setOpenMenuMobile(!openMenuMobile)}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Orders" />
                </ListItemButton>
              </Link>
              <Link to="/payments" className={classes.link} onClick={() => setOpenMenuMobile(!openMenuMobile)}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Payments" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </>
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
    [theme.breakpoints.down("md")]: {
      position: "fixed !important",
      top: "0",
      zIndex: "99999",
    },
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
  link: {
    textDecoration: "none",
    color: "#000",
  },
}));
