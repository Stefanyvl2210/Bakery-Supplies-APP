import React from "react";
import { makeStyles } from "@mui/styles";

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <span>©2022 Bakery Supplies, LLC. All Rights Reserved.</span>
    </div>
  );
};

const useStyles = makeStyles(() => {
  return {
    container: {
      backgroundColor: "#1D2327",
      height: 46,
      flexShrink: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      width: "100%",

      "& span": {
        font: "700 12px/20px Open Sans",
      },
    },
  };
});

export default Footer;
