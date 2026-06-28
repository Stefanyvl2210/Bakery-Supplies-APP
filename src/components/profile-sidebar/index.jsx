import React from "react";
import { Grid } from "@mui/material";

import { makeStyles } from "@mui/styles";

import { Link } from "react-router-dom";

const ProfileSidebar = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container style={{ height: "100%"}}>
        <Grid item xs={12} className={classes.sidebar}>
          <p className={classes.paragraph}>
            <Link to="/my-account">Profile</Link>
          </p>
          <p className={classes.paragraph}>
            <Link to="/orders">Orders</Link>
          </p>
          <p className={classes.paragraph}>
            <Link to="/payments">Payments</Link>
          </p>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileSidebar;

const useStyles = makeStyles((theme) => ({
  sidebar: {
    backgroundColor: "#F3D7CA",
    height: "inherit",
    maxWidth: "280px !important",
    width: "280px !important",
    padding: "60px 50px",

    "@media (max-width: 1280px)": {
      padding: "60px 50px",
    },

    "& p": {
      font: "300 32px/20px Open Sans",

      "& a": {
        color: "#000",
        textDecoration: "none",
      },
    },
  },
  paragraph: {
    marginLeft: "20px",
  },
}));
