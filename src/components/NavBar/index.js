import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

import Logo from "../../assets/images/header-logo.png";
import LoginIcon from "@mui/icons-material/Login";

export default function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
          <LoginIcon onClick={() => navigate("/login")} />
          {/* <Button color="inherit" onClick={() => navigate('/account')}>Account</Button> */}
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
      margin: " 0 15px",
      fontWeight: "600 !important",
      fontSize: "16px !important",
    },
  },
  menuItems: {
    display: "flex",
    alignItems: "center",
  },
}));
