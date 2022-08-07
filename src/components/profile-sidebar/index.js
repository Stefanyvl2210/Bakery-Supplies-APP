import React from "react";
import { Grid } from "@mui/material";

import { makeStyles } from "@mui/styles";

import { Link } from "react-router-dom";

const ProfileSidebar = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12} className={classes.sidebar}>
          <p>
            <Link to="my-account">Profile</Link>
          </p>
          <p>
            <Link to="my-account">Orders</Link>
          </p>
          <p>
            <Link to="my-account">Payments</Link>
          </p>
        </Grid>

        <Grid item xs={9}></Grid>
      </Grid>
    </>
  );
};

export default ProfileSidebar;

const useStyles = makeStyles((theme) => ({
  sidebar: {
    backgroundColor: "#F3D7CA",
    height: "inherit",
    padding: "60px 50px",

    "@media (max-width: 1280px)": {
      padding: "60px 10px",
    },

    "& p": {
      font: "300 32px/20px Open Sans",

      "& a": {
        color: "#000",
        textDecoration: "none",
      },
    },
  },
}));
