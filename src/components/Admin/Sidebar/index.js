import {
  Box,
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import Logo from "../../../assets/images/admin-logo.png";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = React.useState({
    products: false,
    categories: false,
    users: false,
  });
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleClick = (key) => {
    setOpenMenu((prev) => ({ [key]: !prev[key] }));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const MenuListComponent = () => {
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
              <Link to="/admin/products">
                <ListItemText primary="All products" />
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, color: "white" }}>
              <Link to="/admin/new-product">
                <ListItemText primary="Add New" />
              </Link>
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
              <Link to="/admin/categories">
                <ListItemText primary="All categories" />
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, color: "white" }}>
              <Link to="/admin/new-category">
                <ListItemText primary="Add new" />
              </Link>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    );
  };
  return (
    <>
      <Grid item xs={2} className={classes.sidebarWrapper}>
        <div className={classes.sidebar}>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                padding: "28px 20px 28px 28px",
              },
            }}
          >
            <img src={Logo} alt="logo" />
          </Box>

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            <MenuListComponent />
          </Box>
        </div>
      </Grid>
    </>
  );
};

export default Sidebar;

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
    height: "100%",

    "& a": {
      color: "#fff",
      textDecoration: "none",
    },
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
