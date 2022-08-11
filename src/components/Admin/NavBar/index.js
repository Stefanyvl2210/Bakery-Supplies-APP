import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Popper,
  Grid,
  Drawer,
} from "@mui/material";

const drawerWidth = 240;

export default function NavBar(props) {
  const { window } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const userIsLogged = localStorage.getItem("userLogged");
  const anchorRef = React.useRef(null);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState({
    products: false,
    categories: false,
    users: false,
  });

  const handleLogout = () => {
    localStorage.removeItem("userLogged");
    navigate("/");
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleClick = (key) => {
    setOpenMenu((prev) => ({ [key]: !prev[key] }));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const DrawerComponent = () => {
    return (
      <List
        sx={{ width: "100%", maxWidth: 360, color: "#fff !important" }}
        className={classes.listWrapper}
      >
        <ListItemButton onClick={() => handleClick("products")}>
          <ListItemText primary="Products" />
          {openMenu.products ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenu.products} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4, color: "white" }}>
              <ListItemText primary="All products" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, color: "white" }}>
              <ListItemText primary="Add New" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleClick("categories")}>
          <ListItemText primary="Categories" />
          {openMenu.categories ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenu.categories} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4, color: "white" }}>
              <ListItemText primary="All categories" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, color: "white" }}>
              <ListItemText primary="Add new" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleClick("users")}>
          <ListItemText primary="Users" />
          {openMenu.users ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenu.users} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4, color: "white" }}>
              <ListItemText primary="All users" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, color: "white" }}>
              <ListItemText primary="Add new" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    );
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Grid container>
      <Grid item xs={12}>
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
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
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
              ></IconButton>
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
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
              className={classes.menuItems}
            >
              {userIsLogged && (
                <>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                  ></Popper>
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
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#2C3338",
                paddingTop: 5,
              },
            }}
          >
            <DrawerComponent />
          </Drawer>
        </Box>
      </Grid>
    </Grid>
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
    backgroundColor: "#1D2327 !important",
    [theme.breakpoints.down("md")]: {
      position: "fixed !important",
      top: "0",
    },
  },
  sidebarWrapper: {
    "@media (max-width: 900px)": {
      display: "none",
    },
  },
  sidebar: {
    backgroundColor: "#2C3338",
  },
  listWrapper: {
    "& span": {
      font: "400 24px/20px Open Sans !important",
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
