import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { makeStyles } from "@mui/styles";

import Logo from "../../assets/images/header-logo.png";

export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.container}>
      <Toolbar className={classes.toolbar}>
        <div>
          <img src={Logo} alt="logo" />
        </div>

        <div>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Desserts</Button>
          <Button color="inherit">Utensils & ingredientes</Button>
          <Button color="inherit">Cart</Button>
          <Button color="inherit">Account</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: "none !important",
    backgroundColor: "#D9D9D9 !important",
  },
  toolbar: {
    height: 76,
    display: "flex !important",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#767676",
    fontSize: 16,

    "& button": {
      margin: " 0 18px",
      fontWeight: "600 !important",
    },
  },
}));
