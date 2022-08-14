import React from "react";

import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Table from "../../../components/Admin/Table";
import { Button } from "@mui/material";

const Products = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <h1>Products</h1>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => navigate("/admin/new-product")}
        >
          Add new
        </Button>
      </div>

      <Table />
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    maxWidth: "1068px",
    margin: "30px auto 400px auto",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 56,

    "& h1": {
      font: "400 36px/20px Open Sans",
    },
  },
  button: {
    backgroundColor: "#0978DE !important",
    marginLeft: "20px !important",
  },
}));

export default Products;
